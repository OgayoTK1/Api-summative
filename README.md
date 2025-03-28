# 💰 Currency Converter App 🌐

This is a sleek and efficient Currency Converter web application designed to provide users with real-time exchange rates and a seamless conversion experience. It's built with a focus on usability and responsiveness, ensuring it works flawlessly across various devices.

## ✨ Features

-   **🌐 Wide Currency Selection:** Effortlessly choose from a comprehensive list of global currencies using intuitive dropdown menus.
-   **🔢 Real-time Exchange Rates:** Access accurate and up-to-date exchange rates powered by the reliable ExchangeRate-API.
-   **🖼️ Visual Country Flags:** Instantly recognize currencies with visually appealing country flags displayed alongside each selection.
-   **🔄 Quick Currency Swap:** Easily switch between "From" and "To" currencies with a single click, simplifying your conversion process.
-   **⌨️ User-Friendly Input:** Enter amounts with ease using a clean and straightforward input field.
-   **📱 Responsive Design:** Enjoy a consistent and optimized experience across desktops, tablets, and mobile devices.
-   **🚨 Robust Error Handling:** Built-in error handling ensures smooth operation, even in the face of API issues or invalid inputs.

## 🛠️ Technologies Used

-   **HTML5:** Structured and semantic markup for the web page.
-   **CSS3:** Modern styling for a visually appealing and responsive design.
-   **JavaScript (ES6+):** Dynamic functionality and API interaction.
-   **ExchangeRate-API:** A reliable source for real-time exchange rates. [ExchangeRate-API Documentation](https://www.exchangerate-api.com/docs/standard-requests)
-   **Flagcdn:** A fast and efficient service for displaying country flags. [Flagcdn Documentation](https://flagcdn.com/)
-   **Font Awesome:** A comprehensive icon library for enhanced user interface elements. [Font Awesome Documentation](https://fontawesome.com/docs)

## 📂 Files Included

-   `index.html`: The core HTML file that defines the application's structure.
-   `style.css`: The CSS file containing all the styling rules.
-   `App.js`: The JavaScript file with the application's logic and API calls.
-   `country-list.js`: A JavaScript file containing a comprehensive list of currency and country codes.

## 🚀 Setup and Installation (Local)

1.  **Clone the Repository:**

    ```bash
    git clone [https://github.com/OgayoTK1/Api-summative/](https://github.com/OgayoTK1/Api-summative/)
    cd Api-summative
    ```

2.  **Open `index.html`:**

    Simply open the `index.html` file in your preferred web browser to run the application locally.

## 📝 Usage

1.  **Enter Amount:** Input the amount you want to convert in the "Enter Amount" field.
2.  **Select Currencies:** Choose the "From" and "To" currencies from the dropdown lists.
3.  **View Exchange Rate:** The real-time exchange rate and converted amount will be displayed.
4.  **Swap Currencies:** Click the exchange icon to quickly swap the selected currencies.
5.  **Get Exchange Rate:** Press the "Get Exchange Rate" button to refresh the displayed rate.

## 🔑 API Key

-   This application utilizes the ExchangeRate-API for fetching current exchange rates.
-   **Important:** Get your own API Key. Replace `''` in `App.js` with your own API key to ensure proper functionality.
-   You can obtain your free API key at: [ExchangeRate-API](https://www.exchangerate-api.com/).

## 🎬 Demo Video

-   **Watch the Demo Video:** [https://www.loom.com/share/7d86fba6248e42d08deea456bca8ccda?sid=4190d163-2207-47d8-8c31-eb4b7d36b1fc]

    This video showcases the application's key features and demonstrates its ease of use, both locally and when deployed via the load balancer.

## 📌 Important Notes

-   Country flags are displayed using `flagcdn.com`.
-   The exchange icon is provided by `font-awesome`.
-   Comprehensive error handling is implemented to ensure a smooth user experience.
-   The application is fully responsive, adapting to various screen sizes.

## ⚙️ Deployment to Web Servers and Load Balancer

1.  **Transfer Files:** Use `scp` to transfer the application files to `/var/www/html/` on both `Web01` and `Web02`.

    ```bash
    scp index.html style.css App.js country-list.js ubuntu@Web01_IP:/var/www/html/
    scp index.html style.css App.js country-list.js ubuntu@Web02_IP:/var/www/html/
    ```

2.  **Configure Nginx on Web Servers:** Install and configure Nginx to serve the application files from `/var/www/html/`.

3.  **Configure Load Balancer (Lb01):** Install and configure Nginx as a load balancer to distribute traffic between `Web01` and `Web02`.

    ```nginx
    upstream backend {
        server Web01_IP;54.197.196.217
        server Web02_IP;54.196.135.128
    }

    server {
        listen 80;
        location / {
            proxy_pass http://backend;
            # ... other proxy settings ...
        }
    }
    ```

4.  **Access via Load Balancer:** Access the application by navigating to the IP address of `54.236.84.150` in your web browser.

## 🚧 Challenges and Overcoming Them

During the development and deployment of this application, I faced several challenges:

1.  **API Key Security:** Initially, I hardcoded the API key directly into the JavaScript file, which is a security risk. I overcame this by emphasizing the importance of replacing the placeholder key with the user's own API key and clearly documenting this in the README.

2.  **Load Balancer Configuration:** Configuring Nginx as a load balancer was challenging due to the need to understand upstream servers and proxy settings. I overcame this by thoroughly researching Nginx documentation and testing various configurations until the load balancing worked correctly.

3.  **SSH Key Authentication:** I encountered issues with SSH key authentication when transferring files and connecting to the servers. I resolved this by carefully checking the `sshd_config` file, ensuring the correct public keys were added to `authorized_keys`, and verifying file permissions.

4.  **CSS File Linking:** Initially, the CSS file was not linking correctly in the deployed version. I resolved this by verifying the file paths in the HTML and ensuring the Nginx configuration was correctly serving static files.

## 🧑‍💻 Author

-   OgayoAndrew - [OgayoAndrew.net](https://OgayoAndrew.net/)

## 🤝 Contributing

Contributions are highly encouraged! Feel free to submit pull requests to enhance the application.

## 📜 License

This project is licensed under the [MIT License](LICENSE).
