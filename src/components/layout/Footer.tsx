"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export const Footer=()=> {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand / About */}
          <div>
            <h3 className="text-xl font-bold text-[#389958] mb-3">
              ہاشم دواخانہ
            </h3>
            <p className="text-sm leading-relaxed text-gray-600">
              قدرتی جڑی بوٹیوں سے علاج، روایتی حکمت اور صحت مند زندگی کے لیے
              ہاشم دواخانہ آپ کا قابلِ اعتماد ساتھی۔
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">رابطہ</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-[#389958]" />
                <span>لوند خوڑ، مردان، پاکستان</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 text-[#389958]" />
                <a href="tel:+923001234567" className="hover:underline">
                  03189545473
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 text-[#389958]" />
                <a
                  href="mailto:info@hashimdawakhana.pk"
                  className="hover:underline"
                >
                  hashim1122qazi@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} ہاشم دواخانہ۔ جملہ حقوق محفوظ ہیں۔</p>
        </div>
      </div>
    </footer>
  );
}
