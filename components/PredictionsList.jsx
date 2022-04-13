export default function UsersList({ predictions }) {
    return predictions ? predictions.map((prediction) => <PredictionItem prediction={prediction} />) : null;
}

function PredictionItem({ prediction }) {
    return (
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
                <div class="flex flex-wrap -mx-4 -mb-10 text-center">
                    <div class="sm:w-1/2 mb-10 px-4">
                        <div class="rounded-lg h-64 overflow-hidden">
                            <img alt="content" class="object-cover object-center h-full w-full" src={prediction.winner} />
                        </div>
                        <h2 class="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">Winner</h2>
                        <p class="leading-relaxed text-base">{prediction.winner}</p>
                        <button class="flex mx-auto mt-6 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
                    </div>
                    <div class="sm:w-1/2 mb-10 px-4">
                        <div class="rounded-lg h-64 overflow-hidden">
                            <img alt="content" class="object-cover object-center h-full w-full" src={prediction.loser} />
                        </div>
                        <h2 class="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">Loser</h2>
                        <p class="leading-relaxed text-base">{prediction.loser}</p>
                        <button class="flex mx-auto mt-6 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
                    </div>
                </div>
            </div>
        </section>
    )
}