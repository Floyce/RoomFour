# Meridian Estates

A modern, high-end real estate web application designed to showcase premium properties, connect clients with top-tier agents, and provide seamless property management solutions. 

Built with a custom "Dark Forest Green & White" theme to reflect luxury, trust, and exclusivity.

## The Team
This project was designed and developed collaboratively by:

* Floyce Shitandi
* Ian Maina
* Metrine Regina
* Ian Otieno
* Mercyline Afwande
* Joel Onyango

## Tech Stack
* **Django** - Server-rendered pages, routing, and static-file configuration
* **HTML5** - Semantic structure and Django templates
* **CSS3** - Custom styling and theming
* **Bootstrap 5** - Responsive grid, navbar, and UI components
* **JavaScript** - Interactive elements (Scrollspy, image sliders, and form validation)

## Key Features
* **Dynamic Navigation:** Includes smooth scrolling and Bootstrap Scrollspy (the navbar highlights the section you are currently viewing).
* **Property Gallery:** A dedicated Properties page featuring 15+ listings with real-time pricing, bed/bath stats, and agent links.
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing.
* **Agent Profiles:** Dedicated team page showcasing the agents behind the agency.
* **Custom Theming:** Replaced the default Bootstrap template colors with a custom luxury green palette.

## Page Structure
* `Listings/templates/index.html` - Homepage (Hero section, Services, Featured Properties, Agents)
* `Listings/templates/about.html` - Agency story, mission, and stats
* `Listings/templates/services.html` and `service-details.html` - Real estate services
* `Listings/templates/properties.html` and `property-single.html` - Property catalog and detail
* `Listings/templates/agents.html` - Team directory
* `Listings/templates/contact.html` - Contact form and location map
* `Listings/templates/starter-page.html` - Starter page
* `Listings/templates/base.html` - Shared navigation, footer, and static assets
* `static/assets/` - Template CSS, JavaScript, images, and vendor files

## Run the Django Project
1. Install dependencies: `python -m pip install -r requirements.txt`
2. Apply migrations: `python manage.py migrate`
3. Start the development server: `python manage.py runserver`
4. Open the URL printed by Django (usually `http://127.0.0.1:8000/`).

---
*Built as part of the eMobilis Web Development Matrix Class.*
