import React from "react";

export default function Display() {
    return (
        <main className="flex items-center justify-center">
            <video 
                className="w-2/3 rounded-2xl"
                autoPlay
                muted
                loop
                src="./VID-AMR.mp4"
            ></video>
        </main>
    );
}