import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle

def build_pdf(output_path):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    
    # Custom Palette
    primary_color = colors.HexColor("#0f172a")      # Slate 900
    accent_color = colors.HexColor("#991b1b")       # Deep Crimson Red
    text_dark = colors.HexColor("#1e293b")          # Slate 800
    text_muted = colors.HexColor("#475569")         # Slate 600
    line_color = colors.HexColor("#cbd5e1")         # Slate 300

    # Typography styles
    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=primary_color,
        alignment=2 # Right align
    )
    
    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=12,
        leading=16,
        textColor=accent_color,
        alignment=2
    )

    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=text_muted
    )

    section_heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=accent_color,
        spaceAfter=3,
        spaceBefore=7
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=text_dark
    )

    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=text_dark,
        leftIndent=12,
        firstLineIndent=-12
    )

    subheading_style = ParagraphStyle(
        'Subheading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=13,
        textColor=primary_color
    )

    story = []

    # Header Table: Left (Contact Info) | Right (Name & Role)
    left_header = [
        Paragraph("<b>Mobile:</b> +91 7736998984", contact_style),
        Paragraph("<b>Email:</b> jeseena2005@gmail.com", contact_style),
        Paragraph("<b>Location:</b> Palakkad, Kerala", contact_style),
        Paragraph('<b>LinkedIn:</b> <a href="https://linkedin.com/in/jeseena-j-48a126336"><font color="#991b1b"><u>linkedin.com/in/jeseena-j-48a126336</u></font></a>', contact_style),
        Paragraph('<b>GitHub:</b> <a href="https://github.com/Jeseena-codes"><font color="#991b1b"><u>github.com/Jeseena-codes</u></font></a>', contact_style),
    ]

    right_header = [
        Paragraph("JESEENA J", name_style),
        Paragraph("Full Stack Developer", title_style),
    ]

    header_table = Table(
        [[left_header, right_header]],
        colWidths=[310, 230]
    )
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))

    story.append(header_table)
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1.2, color=accent_color, spaceAfter=6, spaceBefore=4))

    # Summary
    story.append(Paragraph("SUMMARY", section_heading_style))
    summary_text = (
        "Aspiring Full Stack Developer with hands-on training in Python, Django, and front-end technologies, "
        "backed by a strong foundation in written communication and analytical thinking from a background in "
        "English Language and Communication. Built a complete medical store management web application during "
        "an internship, covering both front-end and back-end development. Eager to apply strong problem-solving "
        "skills and attention to detail to a full-time development role."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=0.5, color=line_color, spaceAfter=5, spaceBefore=3))

    # Skills
    story.append(Paragraph("SKILLS", section_heading_style))
    skills = [
        ("Python", "Writes clean, efficient code for backend logic and application development."),
        ("Django", "Builds secure, scalable web applications using Django's MVT architecture."),
        ("HTML & CSS", "Structures and styles responsive, well-organized web page layouts."),
        ("JavaScript", "Adds interactivity and dynamic functionality to web interfaces."),
        ("MySQL", "Designs relational databases and writes queries for efficient data handling."),
        ("Development Environments", "VS Code, MySQL Workbench, Python IDLE, Notepad++: Comfortable working across these development environments for coding, debugging, and database management."),
        ("Time Management & Problem-Solving", "Prioritizes tasks effectively and applies analytical thinking to identify issues and implement solutions."),
        ("Team Collaboration & Attention to Detail", "Works well within teams and reviews code and documentation carefully to ensure accuracy."),
        ("Communication", "Strong active listening and interpersonal skills that support clear collaboration and client interaction."),
    ]
    for name, desc in skills:
        story.append(Paragraph(f"&bull;&nbsp; <b>{name}:</b> {desc}", bullet_style))
        story.append(Spacer(1, 2))

    story.append(Spacer(1, 3))
    story.append(HRFlowable(width="100%", thickness=0.5, color=line_color, spaceAfter=5, spaceBefore=3))

    # Projects
    story.append(Paragraph("PROJECTS", section_heading_style))
    
    # Carenova
    story.append(Paragraph("<b>Carenova- Medical Store Website</b> | <i>Safe Technologies</i> | 2025", subheading_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("&bull;&nbsp; Designed and developed a medical store management web application using Python and Django.", bullet_style))
    story.append(Paragraph("&bull;&nbsp; Implemented secure user authentication, medicine inventory management, shopping cart, and order processing.", bullet_style))
    story.append(Paragraph("&bull;&nbsp; Built responsive front-end interfaces using HTML, CSS, and JavaScript, with MySQL for database management.", bullet_style))
    story.append(Spacer(1, 4))

    # JobBizz
    story.append(Paragraph("<b>JobBizz - Job Consultancy Platform</b> | 2025 - 2026", subheading_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("&bull;&nbsp; Developed a job consultancy web application using Python, Django, and MySQL.", bullet_style))
    story.append(Paragraph("&bull;&nbsp; Built separate portals for candidates, companies, and admin.", bullet_style))
    story.append(Paragraph("&bull;&nbsp; Implemented candidate registration and login, job search, and application tracking.", bullet_style))
    story.append(Paragraph("&bull;&nbsp; Created admin features to manage candidates, companies, and feedback using MySQL.", bullet_style))
    
    story.append(Spacer(1, 3))
    story.append(HRFlowable(width="100%", thickness=0.5, color=line_color, spaceAfter=5, spaceBefore=3))

    # Courses & Learning
    story.append(Paragraph("COURSES & LEARNING", section_heading_style))
    story.append(Paragraph("<b>Full Stack Development with Internship</b> | <i>Safe Technologies</i> | Jul 2025 - Mar 2026", subheading_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("&bull;&nbsp; Completed a hands-on full stack development course covering Python, Django, and web technologies, including a practical internship where the MediNova / Carenova project was built end-to-end.", bullet_style))

    story.append(Spacer(1, 3))
    story.append(HRFlowable(width="100%", thickness=0.5, color=line_color, spaceAfter=5, spaceBefore=3))

    # Education
    story.append(Paragraph("EDUCATION", section_heading_style))
    story.append(Paragraph("<b>Bachelor of Arts in Functional English</b> | Govt. Arts & Science College, Nattukal, Kozhinjampara | Kerala | 2022 - 2025", subheading_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("<b>Higher Secondary (Commerce)</b> | Govt. Victoria Girls Higher Secondary School, Anicode | Kerala | 2020 - 2022", subheading_style))

    story.append(Spacer(1, 3))
    story.append(HRFlowable(width="100%", thickness=0.5, color=line_color, spaceAfter=5, spaceBefore=3))

    # Certifications
    story.append(Paragraph("CERTIFICATIONS", section_heading_style))
    story.append(Paragraph("&bull;&nbsp; <b>Python Full Stack Development with Internship:</b> Safe Technologies | Jul 2025 - Mar 2026 | Cert No: StC 5179", bullet_style))
    story.append(Paragraph("&bull;&nbsp; <b>English Language Teaching ('English is Cool' Programme):</b> Dept. of English, Govt. Arts & Science College, Kozhinjampara | Jul 2024 - Jan 2025", bullet_style))

    story.append(Spacer(1, 3))
    story.append(HRFlowable(width="100%", thickness=0.5, color=line_color, spaceAfter=5, spaceBefore=3))

    # Languages
    story.append(Paragraph("LANGUAGES", section_heading_style))
    story.append(Paragraph("English (Conversational), Malayalam (Native), Tamil (Native)", body_style))

    doc.build(story)
    print(f"Successfully generated official CV at: {output_path}")

if __name__ == '__main__':
    targets = [
        os.path.join(os.path.dirname(__file__), 'frontend', 'public', 'images', 'Jeseena_CV.pdf'),
        os.path.join(os.path.dirname(__file__), 'frontend', 'images', 'Jeseena_CV.pdf'),
        os.path.join(os.path.dirname(__file__), 'backend', 'media', 'resumes', 'Jeseena_CV.pdf'),
    ]
    for t in targets:
        build_pdf(t)
