<script lang="ts">
  import { onMount } from 'svelte'
  import autosize from 'autosize'
  import CryptoField from '../components/crypto-field.svelte'

  let synth = typeof window !== 'undefined' ? window.speechSynthesis : null
  let voiceSelect: HTMLSelectElement | undefined
  let textarea: HTMLTextAreaElement | undefined
  let voices: SpeechSynthesisVoice[] = []

  // Remember to btoa() all addresses!
  const ethlikeAddress = 'MHg0ODVhOWFkZjJlYWM4NGY1N2E4OGY3NzQ0YmNkMGYyN2FkMDg2YmJm'
  const blockchains = [
    { chain: 'Polygon', tokens: 'MATIC, ETH/WETH, USDT and SAND', address: ethlikeAddress },
    { chain: 'Ethereum', tokens: 'ETH, WETH and USDT', address: ethlikeAddress },
    { chain: 'BSC', tokens: 'BNB and BUSD', address: ethlikeAddress },
    { chain: 'Cardano', tokens: 'ADA', address: 'YWRkcjFxOTk1azd5NDZsZTQzNHl4bWo5a25wbm1oZHRjZDJ2NmF2czBoZ3RnbGZsM2dja3UzeHRjbnhlcWxmM3I1dzhsczU3a3R2cGx6bGZldmRmcTgzNGw5eDdtdzNjcXV0Znl2YQ==' },
    // { chain: 'Tezos', tokens: 'XTZ', address: 'Tezos Address' },
  ]
  let selectedBlockchain = blockchains.at(0)

  function loadVoices() {
    voices = synth.getVoices()

    voiceSelect!.innerHTML = ''
    voices.forEach((voice) => {
      const option = document.createElement('option')
      option.textContent = `${voice.name} (${voice.localService ? 'local' : 'remote'}${voice.default ? ', default' : ''})`
      option.value = voice.name

      voiceSelect?.appendChild(option)
    })
  }

  onMount(() => {
    loadVoices()

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices
    }

    synth?.addEventListener

    autosize(textarea)
  })

  function handleSubmit(event: SubmitEvent, this: HTMLFormElement): void {
    if (synth.speaking) {
      synth.cancel()
    }

    const data = new FormData(this)

    const utterance = new SpeechSynthesisUtterance(data.get('text') as string)
    utterance.voice = voices.find(({ name }) => name === data.get('voice')) ?? null
    utterance.pitch = parseFloat(data.get('pitch') as string)
    utterance.rate = parseFloat(data.get('speed') as string)

    synth.speak(utterance)
  }

  function stop() {
    if (synth.speaking) {
      synth.cancel()
    }
  }
</script>

<svelte:head>
  <title>Simple & Free Text-to-Speech</title>
</svelte:head>

<div class="min-h-screen">
  <header class="px-6 py-12">
    <h1 class="text-center font-black">
      <div class="text-5xl">Simple & Free</div>
      <div class="text-7xl text-transparent">
        <span class="bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500">Text-to-Speech</span>
      </div>
    </h1>
    <div class="text-center mt-8">
      <span class="text-gray-400">by</span>
      <!-- <a href="https://fruityarlo.github.io" class="bg-slate-200 hover:bg-slate-300 rounded-full pl-2 pr-3 py-2 inline text-base font-semibold text-slate-500 hover:text-slate-700 transition-colors">🥭 fruity arlo</a> -->
      <span class="bg-slate-200 hover:bg-slate-300 rounded-full pl-2 pr-3 py-2 inline text-base font-semibold text-slate-500 hover:text-slate-700 transition-colors">🥭 fruity arlo</span>
    </div>
  </header>

  <main class="px-6 max-w-3xl mx-auto mt-8">
    <div>
      <div class="text-gray-600 font-semibold text-xl text-center">It's easy!</div>
      <div class="flex flex-wrap items-center justify-center gap-6 mt-4">
        <div class="grow-0 shrink-0 flex items-center gap-3">
          <div class="grow-0 shrink-0 rounded-full w-10 h-10 bg-emerald-500 flex justify-center items-center font-semibold text-white text-xl">1</div>
          <div class="grow">Enter text</div>
        </div>
        <div class="grow-0 shrink-0 flex items-center gap-3">
          <div class="grow-0 shrink-0 rounded-full w-10 h-10 bg-teal-500 flex justify-center items-center font-semibold text-white text-xl">2</div>
          <div class="grow">Start your Recorder</div>
        </div>
        <div class="grow-0 shrink-0 flex items-center gap-3">
          <div class="grow-0 shrink-0 rounded-full w-10 h-10 bg-cyan-500 flex justify-center items-center font-semibold text-white text-xl">3</div>
          <div class="grow">Hit the Say! Button</div>
        </div>
      </div>
    </div>

    <form class="mt-16 grid grid-cols-2 gap-4" on:submit|preventDefault={handleSubmit}>
      <div class="col-span-2 pb-1">
        <div>
          <label for="text" class="text-sm text-gray-600 uppercase font-semibold">Text</label>
        </div>
        <textarea name="text" id="text" rows="4" class="block w-full rounded border-gray-400" bind:this={textarea}></textarea>
      </div>

      <div class="col-span-2 py-1">
        <div>
          <label for="voice" class="text-sm text-gray-600 uppercase font-semibold">Voice</label>
        </div>
        <select name="voice" id="voice" class="block w-full rounded border-gray-400" bind:this={voiceSelect}></select>
      </div>

      <div class="py-1">
        <div>
          <label for="pitch" class="text-sm text-gray-600 uppercase font-semibold">Pitch</label>
        </div>
        <select name="pitch" id="pitch" class="block w-full rounded border-gray-400">
          <option value="0">sleepy</option>
          <option value="0.5">calm</option>
          <option value="1" selected>normal (default)</option>
          <option value="1.5">excited</option>
          <option value="2">hysteric</option>
        </select>
      </div>

      <div class="py-1">
        <div>
          <label for="speed" class="text-sm text-gray-600 uppercase font-semibold">Speed</label>
        </div>
        <select name="speed" id="speed" class="block w-full rounded border-gray-400">
          <option value="0.5">sleepy</option>
          <option value="0.75">calm</option>
          <option value="1" selected>normal (default)</option>
          <option value="1.25">excited</option>
          <option value="1.5">hysteric</option>
        </select>
      </div>

      <div class="col-span-2 flex justify-center gap-4 pt-3">
        <button type="submit" class="inline-flex items-center gap-2 uppercase px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 bg-[length:300%_100%] text-white transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
          Say
        </button>
        <button type="button" class="inline-flex items-center gap-2 uppercase px-6 py-3 rounded-lg font-semibold bg-gradient-to-r text-slate-600 bg-slate-200 hover:text-slate-700 hover:bg-slate-300 transition-colors" on:click={stop}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
          </svg>
          Stop
        </button>
      </div>

      <div class="col-span-2 p-4">
        <div class="rounded-lg bg-gradient-to-r from-emerald-200 to-cyan-200 p-6">
          <div class="prose mx-auto">
            <p><strong>This voice generater is free to use!</strong> But if you can spare some change, I'm totally into crypto and super happy about every small donation. See, one or two MATIC won't break the bank, but it would mean a lot to me!</p>

            <div class="space-y-4">
              <select bind:value={selectedBlockchain} class="block rounded-l border border-emerald-500 focus:ring-0 focus:border-emerald-500">
                {#each blockchains as chain}
                  <option value={chain}>{chain.chain}</option>
                {/each}
              </select>

              <CryptoField bind:address={selectedBlockchain.address}/>

              <p class="text-sm text-emerald-700 mt-0">Please send only {selectedBlockchain.tokens} on this network.</p>
            </div>

            <p>Don't wanna spend money? You can <a href="https://twitter.com/fruityarlo">follow me on Twitter</a> instead!</p>
          </div>
        </div>
      </div>
    </form>
  </main>

  <div class="px-6">
    <aside class=" pb-12 prose mx-auto prose-lg prose-cyan mt-12 prose-[dt]:font-semibold border-t pt-12">
      <h2>FAQ</h2>

      <dl>
        <dt>This is AI! This must be AI, right?!</dt>
        <dd>Voice generation techniques are around for some time now, way longer than the recent AI hype. But I have really no ideal how they work internally. Maybe wanna read about <a href="https://en.wikipedia.org/wiki/Speech_synthesis">speech synthesis on wikipedia</a>?</dd>

        <dt>Okay nice, but how can I download it?</dt>
        <dd>You can't. You have to record the voice yourself, for exmaple with Audio Recorder on Windows or OBS.</dd>

        <dt>Why can't I just download it?</dt>
        <dd>I know that it's possible to 'hack' into your browser with <code>MediaDevices.getUserMedia()</code> but that does basically the same thing and you have to approve it. Why not use that additional click to give you full control over the recording?</dd>

        <dt>Which voices are available?</dt>
        <dd>That depends on your operating system and your browser, because they provide the voices. In operating systems you can install additional languages and voices. On the browser front, Google Chrome offer's voices in many languages. Really didn't test in other browsers.</dd>

        <dt>What's this local & remote?</dt>
        <dd>Some voices are generated locally, for example the voices provided by Windows. Voices from Google Chrome on the other hand are generated on Google's servers. <u>That means your text is sent to remote servers by the browser or your operating system. It's not this webapp that sends stuff!</u> This app cannot influence where voice is generated, but it can show it to you transparently!</dd>

        <dt>Is it really free?</dt>
        <dd>Yes. (But have you seen the green box further up the page?)</dd>

        <dt>Can I use the generated audio commercially?</dt>
        <dd>I am no lawyer! You have to read your operating system's or browser's license agreement.</dd>

        <dt>Can you add this or that feature.</dt>
        <dd>No. I built this GUI for my specific use case and it's perfect for that.</dd>
      </dl>
    </aside>
  </div>
</div>

<footer >

</footer>
