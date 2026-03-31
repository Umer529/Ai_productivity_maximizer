import pdfplumber

with pdfplumber.open('Ai_Productivity_maximizer.pdf') as pdf:
    for page in pdf.pages:
        text = page.extract_text()
        if text:
            print(text)