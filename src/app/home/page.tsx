export default function Home() {
    const submitText: string = "Join";

    return (
        <div className="bg-pink-500 flex flex-col m-10">
            <input type="text" placeholder="Room ID" />
            <button className="mt-6 bg-orange-500">{submitText.toUpperCase()}</button>
        </div>
    );
}
