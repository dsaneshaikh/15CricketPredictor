import React from "react";

function Footer() {
  return (
    <footer>
      <div class="footer-top h-16 bg-gray-900 text-white">
        <nav class="flex justify-between items-center h-[100%] px-20 list-none">
          <div class="branding flex items-center gap-4">
            <img src="" alt="footer-logo" class="w-10 h-10" />
            <span class="text-lg font-bold">Brand Name</span>
          </div>
          <ul class="flex gap-8 text-sm">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Contact Us</li>
          </ul>
        </nav>
      </div>
      <div class="footer-bottom h-12 bg-black text-gray-400">
        <nav class="flex justify-center items-center h-[100%] gap-6 text-xs">
          <p>© 2024 Brand Name. All rights reserved.</p>
          <ul class="flex gap-4">
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
