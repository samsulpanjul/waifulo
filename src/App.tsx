import { useState } from "react";
import { run } from "./gemini";

function App() {
  const [name, setName] = useState<string>("");
  const [series, setSeries] = useState<string>("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [empty, setEmpty] = useState<boolean>(false);

  function handleValue(setTarget: any, e: any) {
    setTarget(e.target.value);
  }

  async function handleSubmit() {
    try {
      setLoading(true);
      if (!name || !series) {
        setEmpty(true);
        return;
      }
      setEmpty(false);
      setMsg(await run(`${name} - ${series}`));
    } catch (error) {
      setMsg("Error, silahkan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-5 mx-auto w-10/12 md:w-1/2 lg:w-1/3">
      <p className="text-5xl font-bold text-center mb-3 underline">waifulo!</p>
      <p className="text-center text-xl mb-5">Roasting waifu lu yang sampah itu!</p>
      <div className="box px-6 py-4 mb-9">
        <div className="flex flex-col sm:flex-row justify-around gap-4 mb-5">
          <div className="w-full">
            <label className="font-semibold" htmlFor="name">
              Nama
            </label>
            <input type="text" name="name" id="name" onChange={(e) => handleValue(setName, e)} className="border border-neutral-800 w-full px-3 py-1 rounded-lg placeholder:italic" placeholder="Firefly" />
          </div>
          <div className="w-full">
            <label className="font-semibold" htmlFor="series">
              Dari
            </label>
            <input type="text" name="series" id="series" onChange={(e) => handleValue(setSeries, e)} className="border border-neutral-800 w-full px-3 py-1 rounded-lg placeholder:italic" placeholder="Honkai Star Rail" />
          </div>
        </div>
        <button onClick={handleSubmit} className="bg-lime-300 btn px-3 py-1 font-semibold w-full disabled:cursor-not-allowed disabled:bg-lime-200 disabled:opacity-75" disabled={loading}>
          Roast!
        </button>
        {empty && <p className="text-red-600 text-sm mt-2">nama dan series karakter harus diisi!</p>}
      </div>
      {loading && <p className="text-center font-semibold text-xl">Bentar...</p>}
      {msg && !loading && (
        <div className="box mt-9 px-6 py-4 mb-10">
          <p className="text-lg">{msg}</p>
        </div>
      )}
    </div>
  );
}

export default App;
