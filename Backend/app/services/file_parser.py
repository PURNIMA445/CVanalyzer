import io
import pdfplumber
from docx import Document
import re


def clean_text(text: str) -> str:
    # normalize whitespace
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def extract_text_from_pdf(file_bytes: bytes) -> str:
    text = []

    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text.append(page_text)

    return clean_text("\n".join(text))


def extract_text_from_docx(file_bytes: bytes) -> str:
    doc = Document(io.BytesIO(file_bytes))

    text = []

    for p in doc.paragraphs:
        if p.text:
            text.append(p.text)

    return clean_text("\n".join(text))


def parse_file(filename: str, file_bytes: bytes) -> str:
    ext = filename.rsplit(".", 1)[-1].lower()

    if ext == "pdf":
        return extract_text_from_pdf(file_bytes)

    elif ext == "txt":
        return clean_text(file_bytes.decode("utf-8", errors="ignore"))

    elif ext in ("doc", "docx"):
        return extract_text_from_docx(file_bytes)

    else:
        raise ValueError(f"Unsupported file type: .{ext}")