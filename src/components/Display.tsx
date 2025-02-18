import { useState } from "react";

export default function Display() {
    const [count, setCount] = useState(0);

    const medias = ['./VID-AMR.mp4', './IMG-20241222-WA0039.jpg', './IMG-20241231-WA0024.jpg', './IMG-20250202-WA0026.jpg'];

    const isVideo = medias[count].endsWith(".mp4");

    return (
        <main className="flex items-center justify-center">
            <button onClick={() => setCount((count + 1) % medias.length)}>
                {isVideo ? (
                    <video 
                        className="h-[80vh] max-w-screen rounded-2xl"
                        autoPlay
                        muted
                        loop
                        src={medias[count]}
                    ></video>
                ) : (
                    <img
                        className="h-[80vh] rounded-2xl"
                        src={medias[count]}
                        alt="media"
                    />
                )}
            </button>
        </main>
    );
}
