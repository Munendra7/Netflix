/**
 * HTML to DOCX Converter
 * A vanilla TypeScript implementation that converts HTML to DOCX format
 * using the altchunk method (embedding MHT content)
 */

export interface DocxOptions {
  orientation?: 'portrait' | 'landscape';
  margins?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    header?: number;
    footer?: number;
    gutter?: number;
  };
}

export class HtmlDocx {
  /**
   * Convert HTML string to DOCX Blob
   * @param html Complete HTML document string (should include DOCTYPE, html, head, body)
   * @param options Optional configuration for page setup
   * @returns Blob containing the DOCX file
   */
  static asBlob(html: string, options: DocxOptions = {}): Blob {
    const mhtml = this.htmlToMhtml(html);
    const docx = this.mhtmlToDocx(mhtml, options);
    return new Blob([docx], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
  }

  /**
   * Convert HTML to MHTML format
   */
  private static htmlToMhtml(html: string): string {
    const boundary = 'NEXT.ITEM-boundary';
    const mhtml = [
      'MIME-Version: 1.0',
      `Content-Type: multipart/related; boundary="${boundary}"`,
      '',
      `--${boundary}`,
      'Content-Type: text/html; charset="utf-8"',
      'Content-Transfer-Encoding: quoted-printable',
      'Content-Location: file:///C:/document.html',
      '',
      this.encodeQuotedPrintable(html),
      `--${boundary}--`
    ].join('\r\n');

    return mhtml;
  }

  /**
   * Encode string to quoted-printable format
   */
  private static encodeQuotedPrintable(str: string): string {
    const lines: string[] = [];
    let currentLine = '';

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      const code = str.charCodeAt(i);

      if (code === 13) { // CR
        continue;
      } else if (code === 10) { // LF
        lines.push(currentLine);
        currentLine = '';
      } else if (
        (code >= 33 && code <= 60) ||
        (code >= 62 && code <= 126) ||
        code === 9 ||
        code === 32
      ) {
        currentLine += char;
      } else {
        currentLine += `=${code.toString(16).toUpperCase().padStart(2, '0')}`;
      }

      if (currentLine.length >= 73) {
        lines.push(currentLine + '=');
        currentLine = '';
      }
    }

    if (currentLine.length > 0) {
      lines.push(currentLine);
    }

    return lines.join('\r\n');
  }

  /**
   * Create DOCX file from MHTML
   */
  private static mhtmlToDocx(mhtml: string, options: DocxOptions): ArrayBuffer {
    const zip = new ZipWriter();

    // Add [Content_Types].xml
    zip.addFile('[Content_Types].xml', this.createContentTypes());

    // Add _rels/.rels
    zip.addFile('_rels/.rels', this.createRootRels());

    // Add word/document.xml
    zip.addFile('word/document.xml', this.createDocument(options));

    // Add word/_rels/document.xml.rels
    zip.addFile('word/_rels/document.xml.rels', this.createDocumentRels());

    // Add word/afchunk.mht (the MHTML content)
    zip.addFile('word/afchunk.mht', mhtml);

    return zip.generate();
  }

  /**
   * Create [Content_Types].xml
   */
  private static createContentTypes(): string {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Default Extension="mht" ContentType="message/rfc822"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;
  }

  /**
   * Create _rels/.rels
   */
  private static createRootRels(): string {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;
  }

  /**
   * Create word/document.xml with altChunk
   */
  private static createDocument(options: DocxOptions): string {
    const orientation = options.orientation || 'portrait';
    const margins = options.margins || {};

    // Convert margins to twips (1/20th of a point)
    const topMargin = margins.top || 1440;
    const rightMargin = margins.right || 1440;
    const bottomMargin = margins.bottom || 1440;
    const leftMargin = margins.left || 1440;
    const headerMargin = margins.header || 720;
    const footerMargin = margins.footer || 720;
    const gutterMargin = margins.gutter || 0;

    // Page size in twips (landscape swaps width and height)
    const isLandscape = orientation === 'landscape';
    const pageWidth = isLandscape ? 15840 : 12240; // Letter size
    const pageHeight = isLandscape ? 12240 : 15840;

    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    <w:altChunk r:id="htmlChunk"/>
    <w:sectPr>
      <w:pgSz w:w="${pageWidth}" w:h="${pageHeight}"${isLandscape ? ' w:orient="landscape"' : ''}/>
      <w:pgMar w:top="${topMargin}" 
               w:right="${rightMargin}" 
               w:bottom="${bottomMargin}" 
               w:left="${leftMargin}" 
               w:header="${headerMargin}" 
               w:footer="${footerMargin}" 
               w:gutter="${gutterMargin}"/>
    </w:sectPr>
  </w:body>
</w:document>`;
  }

  /**
   * Create word/_rels/document.xml.rels
   */
  private static createDocumentRels(): string {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="htmlChunk" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/aFChunk" Target="afchunk.mht"/>
</Relationships>`;
  }
}

/**
 * Simple ZIP writer for creating DOCX files
 */
class ZipWriter {
  private files: Map<string, Uint8Array> = new Map();

  addFile(path: string, content: string): void {
    const encoder = new TextEncoder();
    this.files.set(path, encoder.encode(content));
  }

  generate(): ArrayBuffer {
    const centralDirectory: Uint8Array[] = [];
    const fileData: Uint8Array[] = [];
    let offset = 0;

    // Write all files
    for (const [path, data] of this.files) {
      const localHeader = this.createLocalFileHeader(path, data);
      fileData.push(localHeader, data);

      const centralDirEntry = this.createCentralDirectoryEntry(
        path,
        data,
        offset
      );
      centralDirectory.push(centralDirEntry);

      offset += localHeader.length + data.length;
    }

    // Create end of central directory
    const centralDirData = this.concatenateArrays(centralDirectory);
    const endOfCentralDir = this.createEndOfCentralDirectory(
      this.files.size,
      centralDirData.length,
      offset
    );

    // Combine everything
    const allData = this.concatenateArrays([
      ...fileData,
      centralDirData,
      endOfCentralDir
    ]);

    return allData.buffer;
  }

  private createLocalFileHeader(path: string, data: Uint8Array): Uint8Array {
    const encoder = new TextEncoder();
    const pathBytes = encoder.encode(path);
    const crc = this.crc32(data);

    const header = new Uint8Array(30 + pathBytes.length);
    const view = new DataView(header.buffer);

    // Local file header signature
    view.setUint32(0, 0x04034b50, true);
    // Version needed to extract
    view.setUint16(4, 20, true);
    // General purpose bit flag
    view.setUint16(6, 0, true);
    // Compression method (0 = no compression)
    view.setUint16(8, 0, true);
    // Last mod file time
    view.setUint16(10, 0, true);
    // Last mod file date
    view.setUint16(12, 0, true);
    // CRC-32
    view.setUint32(14, crc, true);
    // Compressed size
    view.setUint32(18, data.length, true);
    // Uncompressed size
    view.setUint32(22, data.length, true);
    // File name length
    view.setUint16(26, pathBytes.length, true);
    // Extra field length
    view.setUint16(28, 0, true);
    // File name
    header.set(pathBytes, 30);

    return header;
  }

  private createCentralDirectoryEntry(
    path: string,
    data: Uint8Array,
    offset: number
  ): Uint8Array {
    const encoder = new TextEncoder();
    const pathBytes = encoder.encode(path);
    const crc = this.crc32(data);

    const entry = new Uint8Array(46 + pathBytes.length);
    const view = new DataView(entry.buffer);

    // Central directory signature
    view.setUint32(0, 0x02014b50, true);
    // Version made by
    view.setUint16(4, 20, true);
    // Version needed to extract
    view.setUint16(6, 20, true);
    // General purpose bit flag
    view.setUint16(8, 0, true);
    // Compression method
    view.setUint16(10, 0, true);
    // Last mod file time
    view.setUint16(12, 0, true);
    // Last mod file date
    view.setUint16(14, 0, true);
    // CRC-32
    view.setUint32(16, crc, true);
    // Compressed size
    view.setUint32(20, data.length, true);
    // Uncompressed size
    view.setUint32(24, data.length, true);
    // File name length
    view.setUint16(28, pathBytes.length, true);
    // Extra field length
    view.setUint16(30, 0, true);
    // File comment length
    view.setUint16(32, 0, true);
    // Disk number start
    view.setUint16(34, 0, true);
    // Internal file attributes
    view.setUint16(36, 0, true);
    // External file attributes
    view.setUint32(38, 0, true);
    // Relative offset of local header
    view.setUint32(42, offset, true);
    // File name
    entry.set(pathBytes, 46);

    return entry;
  }

  private createEndOfCentralDirectory(
    fileCount: number,
    centralDirSize: number,
    centralDirOffset: number
  ): Uint8Array {
    const eocd = new Uint8Array(22);
    const view = new DataView(eocd.buffer);

    // End of central dir signature
    view.setUint32(0, 0x06054b50, true);
    // Number of this disk
    view.setUint16(4, 0, true);
    // Disk where central directory starts
    view.setUint16(6, 0, true);
    // Number of central directory records on this disk
    view.setUint16(8, fileCount, true);
    // Total number of central directory records
    view.setUint16(10, fileCount, true);
    // Size of central directory
    view.setUint32(12, centralDirSize, true);
    // Offset of start of central directory
    view.setUint32(16, centralDirOffset, true);
    // Comment length
    view.setUint16(20, 0, true);

    return eocd;
  }

  private concatenateArrays(arrays: Uint8Array[]): Uint8Array {
    const totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;

    for (const arr of arrays) {
      result.set(arr, offset);
      offset += arr.length;
    }

    return result;
  }

  private crc32(data: Uint8Array): number {
    let crc = 0xffffffff;
    const table = this.makeCrcTable();

    for (let i = 0; i < data.length; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ data[i]) & 0xff];
    }

    return (crc ^ 0xffffffff) >>> 0;
  }

  private makeCrcTable(): Uint32Array {
    const table = new Uint32Array(256);

    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) {
        c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      }
      table[i] = c;
    }

    return table;
  }
}

// Export a simple function API as well
export function asBlob(html: string, options?: DocxOptions): Blob {
  return HtmlDocx.asBlob(html, options);
}

// Default export for compatibility
export default {
  asBlob,
  HtmlDocx
};
