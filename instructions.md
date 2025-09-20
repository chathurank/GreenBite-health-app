# Scenario

**GreenBite is a wellness brand that promotes healthy living through balanced meals, exercise, and mindfulness. Your task is to design and develop a fully functional multi-page website for GreenBite using only HTML, CSS, and JavaScript (no backend frameworks). The goal is to create an interactive, aesthetically pleasing, and responsive website that educates and engages users.**

# Tips
Although not directly assessed, you are advised to

- look at other Healthy Lifestyle Websites and current trends in web design for desktop and mobile to give you inspiration (**DO NOT COPY**)
- design all pages before you start (some of this will be assessed in task two)

# Website Structure

**1\. Home Page**
- Hero section with auto-rotating health slogans or quotes (JavaScript)
- Responsive navigation bar with animated hamburger menu (mobile view)
- Featured content: health tips of the day (change daily using JavaScript and date-based logic)
- Footer with links and newsletter subscription (store email in localStorage)

**2\. Healthy Recipes Page**
- Display recipes as cards (image, title, short description)
- Use filter/search (by category and name)
- Clicking a recipe opens a modal with full recipe including:
  - Ordered list of steps
  - Unordered list of ingredients
  - Nutrition info in a table (HTML table required)
- Recipe data stored in JSON or JS object

**3\. Calorie & Nutrition Calculator**
- Form: age (years), gender (Male/Female), height (cm), weight (kg), activity level
- JavaScript calculates and displays:
  - BMR (Basal Metabolic Rate) - how many calories the body burns at rest.

For males:  
BMR = 10 × weight (kg) + 6.25 × height (cm) − 5 × age (years) + 5

For females:  
BMR = 10 × weight (kg) + 6.25 × height (cm) − 5 × age (years) − 161

- TDEE (Total Daily Energy Expenditure) - total calories the body needs per day based on activity.

| **Activity Level** | **Description** | **Factor** |
| --- | --- | --- |
| Sedentary | Little or no exercise | 1.2 |
| Lightly active | Light exercise/sports 1–3 days/week | 1.375 |
| Moderately active | Moderate exercise 3–5 days/week | 1.55 |
| Very active | Hard exercise 6–7 days/week | 1.725 |
| Super active | Very hard exercise/physical job | 1.9 |

TDEE = BMR x Activity Factor

- Macronutrient breakdown - how calories are divided into carbs, protein, and fat.
  - Carbohydrates (4 kcal per gram)
  - roteins (4 kcal per gram)
    - Fats (9 kcal per gram)

- A common healthy ratio is:
  - 50% Carbs
  - 0% Protein
  - 30% Fat

- To calculate macros from TDEE:
  - Carbs (g) = (TDEE × 0.50) ÷ 4
  - Protein (g) = (TDEE × 0.20) ÷ 4
  - Fat (g) = (TDEE × 0.30) ÷ 9
  - Display result with progress bars or animated counters

**4\. Workout Generator Page**
- Dropdown or checkbox form for user to select:
  - Body part (arms, legs, full body, etc.)
  - Equipment (none, dumbbells, etc.)
- JavaScript randomly generates a workout plan
- Include a countdown timer for each exercise (with sound or animation)

**5\. Mindfulness Page**
- Guided breathing animation (inhale/exhale cycle)
- Timer tool (Pomodoro or meditation session)
- Option to play ambient sounds (toggle on/off via buttons)
- Track completed sessions using localStorage

**6\. Contact & Feedback Page**
- Fully validated form: Name, Email, Message
- On submission, display a confirmation message and store the feedback in localStorage
- Embedded map of GreenBite HQ
- FAQ accordion section using JavaScript

# Website expectations
- All pages should be html pages
- Do not use any JavaScript libraries

# Website Styling and UX Expectations
- Use clean and minimal CSS styles
- Use Google Fonts (Optional) and consistent color palette
- Responsive design using Flexbox and/or CSS Grid
- Custom CSS animations for interactions (buttons, loaders, hover effects)
- Smooth scrolling and scroll-based animations (e.g., reveal on scroll)
- Use media queries to ensure usability on mobile, tablet, and desktop devices
- The website should have proper favicons and the website should also work as a PWA

# JavaScript Requirements (in addition to above)

- Use minimal and modern JavaScript techniques
- Use event listeners and DOM manipulation effectively
- Use JSON objects to populate recipe and workout data
- Form validation (custom alerts for errors, successful submission messages)
- Animations triggered by user interaction (hover, scroll, click)
- Use localStorage to store user interactions (e.g., saved recipes, newsletter email)
- Include at least one reusable JS function across multiple pages

# Hosting
You are required to host your completed website using GitHub Pages. This ensures your project is accessible online and demonstrates your ability to use version control and cloud-based deployment.

### Requirements:

- Create a GitHub repository specifically for this project. Use a meaningful repository name (e.g., greenbite-wellness-site).
- Upload all website files (HTML, CSS, JavaScript, images, etc.) to the repository, ensuring the structure is clean and well-organized.
- Enable GitHub Pages in your repository settings and choose the correct branch (typically main or master) and folder (usually root or /docs).
- Verify that the website is publicly accessible via the GitHub Pages URL.
- Include the live GitHub Pages link clearly in your assignment submission document.

# Testing
Before submitting your final website, it must be thoroughly tested using the following methods. You are expected to identify and resolve as many issues as possible based on the results of these tests.

Your website should be checked with below testing and fix as many errors as possible.

- HTML Validity Testing: Use the W3C Markup Validation Service to ensure your HTML is syntactically correct.
- CSS Validity Testing: Use the W3C CSS Validator to confirm your CSS adheres to official standards.
- Accessibility Testing: Use the WAVE Web Accessibility Evaluation Tool to identify and improve accessibility issues, ensuring your site is usable by all users.
- Lighthouse Testing: Run Google Lighthouse in Chrome DevTools to evaluate performance, accessibility, best practices, and SEO.
- Responsiveness Testing: Check your website across different screen sizes (mobile, tablet, desktop) to ensure a consistent and usable experience.