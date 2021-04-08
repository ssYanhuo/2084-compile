(function() {
  const vis = require('vis-network')
  const {NFA} = window.lib
  let {NETWORK_OPTIONS, render_nfa_to_network_data} = window.renderer
  const {run: run_simulator, runWithBacktrack: run_simulator_backtrack} = window.simulator_step
  const network = new vis.Network(document.getElementById('canvas'), {nodes: [], edges: []}, NETWORK_OPTIONS)
  const btnTextStart = "执行匹配"
  const btnTextNext = "下一步"

  let running = false
  let nextStep = null
  let currentNfa = null
  let withBacktrack = false
  let regexData = window.regexData


  const el_regx = document.getElementById('input-regx')
  const el_text = document.getElementById('input-text')
  const el_result = document.getElementById('result')

  el_regx.addEventListener('input', invokeLater(render))
  document.getElementById('btn-run').addEventListener('click', run)
  document.getElementById('btn-stop').addEventListener('click', stop)
  document.getElementById('checkbox-physics').addEventListener('click', togglePhysics)
  render()

  function invokeLater(fn, delay = 200) {
    let timer
    return () => {
      clearTimeout(timer)
      timer = setTimeout(() => fn(), delay)
    }
  }

  function render() {
    const regexp = el_regx.value
    const nfa = currentNfa = NFA.createFromRegexp(regexp)
    const data = render_nfa_to_network_data(nfa)
    network.setData(data)
  }

  function run() {
    regexData.btnText = btnTextNext
    regexData.buttonsDisabled = true
    withBacktrack = regexData.isBackTrack
    if (running) {
      nextStep()
    } else {
      running = true
      ;(withBacktrack ? run_simulator_backtrack : run_simulator)(currentNfa, el_text.value, (state, next) => {
        if (!next) {
          updateState(state, false)
          stop()
          return
        }
        updateState(state, true)
        nextStep = next
      })
    }
  }

  function updateState(state, hasNext) {
    if (state.states.size === 0) return
    const nodes = Array.from(state.states).map((s) => s.id)
    network.setSelection({nodes}, {highlightEdges: false})
    if(hasNext){
      el_result.innerHTML = `步数：<b>${state.step}</b><br>下一步：<b>${state.char || ''}</b><br>`
    }else {
      el_result.innerHTML = `步数：<b>${state.step}</b><br>匹配结果：<b>${state.result}</b>`
    }

  }

  function stop() {
    regexData.btnText = btnTextStart
    regexData.buttonsDisabled = false
    running = false
  }

  function togglePhysics(){
    if (NETWORK_OPTIONS.physics === undefined){
      console.log(NETWORK_OPTIONS)
      NETWORK_OPTIONS.physics = {}
    }
    NETWORK_OPTIONS.physics.enabled = !regexData.physicsEnabled;
    network.setOptions(NETWORK_OPTIONS)
  }
})()