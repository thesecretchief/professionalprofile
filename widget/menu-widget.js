/**
 * Menu Widget
 * Usage: Inject this widget into your pages by calling `injectMenuWidget()`
 */

function createMenuWidget() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <!-- Menu Section -->
        <section class="py-8 bg-gray-200">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <nav class="flex justify-center space-x-6">
                    <a href="index.html" class="text-indigo-600 hover:underline">Profile</a>      
                    <a href="Lee_Foropoulos_DISC_Profile.html" class="text-indigo-600 hover:underline">DISC</a>
                    <a href="Lee_Foropoulos_Human_Design_Profile.html" class="text-indigo-600 hover:underline">Human Design</a>
                    <a href="Lee_Foropoulos_MBTI.html" class="text-indigo-600 hover:underline">MBTI</a>
                    <a href="Lee_Foropoulos_Big_Five.html" class="text-indigo-600 hover:underline">Big Five Traits</a>
                </nav>
            </div>
        </section>

        <!-- Social Icons Section -->
        <section class="py-8 bg-white">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <div class="flex justify-center space-x-6">
                    <a href="https://www.linkedin.com/in/thesecretchief" target="_blank" rel="noopener"><img src="https://cdn-icons-png.flaticon.com/32/145/145807.png" alt="LinkedIn" class="social-icon"></a>
                    <a href="https://www.instagram.com/thesecretchief" target="_blank" rel="noopener"><img src="https://cdn-icons-png.flaticon.com/32/174/174855.png" alt="Instagram" class="social-icon"></a>
                    <a href="https://www.facebook.com/thesecretchief" target="_blank" rel="noopener"><img src="https://cdn-icons-png.flaticon.com/32/733/733547.png" alt="Facebook" class="social-icon"></a>
                    <a href="https://www.upwork.com/freelancers/thesecretchief?viewMode=1" target="_blank" rel="noopener"><img src="https://cdn-icons-png.flaticon.com/32/5968/5968855.png" alt="Upwork" class="social-icon"></a>
                </div>
            </div>
        </section>
    `;
    return wrapper;
}

/**
 * Injects the menu widget at the top of the <body>.
 * Call this function from your page to add the menu.
 */
export function injectMenuWidget() {
    const widget = createMenuWidget();
    document.body.insertBefore(widget, document.body.firstChild);
}