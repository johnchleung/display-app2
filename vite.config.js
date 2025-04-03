import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            strategies: "injectManifest",
            srcDir: "src",
            filename: "sw.js",
            registerType: "prompt",
            injectRegister: true,

            pwaAssets: {
                disabled: false,
                config: true,
            },

            includeAssets: [
                "favicon.png",
                "robots.txt",
                "apple-touch-icon.png",
            ],
            workbox: {
                runtimeCaching: [
                    {
                        urlPattern: ({ request }) =>
                            request.destination === "document",
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "documents",
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                            },
                        },
                    },
                    {
                        urlPattern: ({ request }) =>
                            request.destination === "image",
                        handler: "CacheFirst",
                        options: {
                            cacheName: "images",
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                            },
                        },
                    },
                ],
            },
            manifest: {
                name: "display-app2",
                short_name: "dd",
                description: "display-app2",
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "favicon.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "favicon.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },

            injectManifest: {
                globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
            },

            devOptions: {
                enabled: false,
                navigateFallback: "index.html",
                suppressWarnings: true,
                type: "module",
            },
        }),
    ],
    server: {
        port: 3000,
    },
});
