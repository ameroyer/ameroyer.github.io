/**
 * Polya Urn – Vanilla D3 Visualizations
 */
(function () {
  'use strict';

  /* ── shared constants ───────────────────────────────────────────────── */
  var URN_W       = 650,
      URN_H       = 260,
      DYN_W       = 650,
      DYN_H       = 250,
      acolor      = 'Orange',
      bcolor      = 'CornflowerBlue',
      text_color  = '#222222',
      num_cols    = 15,
      r           = Math.floor(URN_W / 2 / num_cols / 2),
      line_offset = 2,
      txt_pad     = 4,
      NUM_STEPS   = 100,
      NUM_RUNS    = 60;

  /* ═══════════════════════════════════════════════════════════════════════
     Figure 1 – PolyaUrn (balls in an urn)
  ═══════════════════════════════════════════════════════════════════════ */

  function ballY(pos) {
    return URN_H - r - line_offset - Math.floor(pos / num_cols) * (line_offset + 2 * r);
  }

  function drawBalls(svg, a, b) {
    svg.selectAll('circle.ball').remove();
    var i;
    for (i = 0; i < a; i++) {
      svg.append('circle').attr('class', 'ball')
        .attr('r', r)
        .attr('cx', URN_W / 2 - r - (i % num_cols) * 2 * r)
        .attr('cy', ballY(i))
        .style('stroke', 'black').style('stroke-width', 2)
        .style('fill', acolor);
    }
    for (i = 0; i < b; i++) {
      svg.append('circle').attr('class', 'ball')
        .attr('r', r)
        .attr('cx', URN_W / 2 + r + (i % num_cols) * 2 * r)
        .attr('cy', ballY(i))
        .style('stroke', 'black').style('stroke-width', 2)
        .style('fill', bcolor);
    }
  }

  function initPolyaUrn(figureEl) {
    var container = figureEl.querySelector('.d3-component');
    if (!container) return;

    container.innerHTML = '';

    /* Read initial values from the idyll-dynamic spans */
    var dynSpans = figureEl.querySelectorAll('.idyll-dynamic');
    var a0 = parseInt((dynSpans[0] || {}).textContent || '1', 10);
    var b0 = parseInt((dynSpans[1] || {}).textContent || '2', 10);

    var svg = d3.select(container).append('svg')
      .attr('viewBox', '0 0 ' + URN_W + ' ' + URN_H)
      .attr('overflow', 'visible')   /* allow animated balls to enter from top */
      .style('width', '100%')
      .style('height', 'auto')
      .style('display', 'block');

    svg.append('rect')
      .attr('width', URN_W).attr('height', URN_H).attr('fill', 'white')
      .style('stroke', '#ccc').style('stroke-width', 1);

    drawBalls(svg, a0, b0);

    /* ratio label */
    var lbl = svg.append('text')
      .attr('x', 2 * URN_W / 3).attr('y', 25)
      .text('Ratio b / (a + b) = ')
      .attr('font-family', 'sans-serif').attr('font-size', '16px')
      .attr('fill', text_color);
    var lb = lbl.node().getBBox();

    var ratioTxt = svg.append('text').attr('class', 'polya-ratio')
      .attr('x', lb.x + lb.width + 5).attr('y', 25)
      .text(d3.format(',.2f')(b0 / (a0 + b0)))
      .attr('font-family', 'sans-serif').attr('font-size', '16px')
      .attr('fill', b0 > a0 ? bcolor : acolor);
    var rb = ratioTxt.node().getBBox();

    svg.append('rect')
      .attr('x', lb.x - txt_pad).attr('y', lb.y - txt_pad)
      .attr('width', lb.width + rb.width + 5 + 2 * txt_pad)
      .attr('height', lb.height + 2 * txt_pad)
      .attr('fill', 'none').style('stroke', text_color).style('stroke-width', 1);

    function updateRatio(a, b) {
      svg.select('.polya-ratio')
        .text(d3.format(',.2f')(b / (a + b)))
        .attr('fill', b > a ? bcolor : acolor);
    }

    /* Simulate button – add listener directly, no cloneNode needed */
    var btn = figureEl.querySelector('button.simulate');
    if (btn) {
      btn.addEventListener('click', function () {
        var a = parseInt((dynSpans[0] || {}).textContent || '1', 10);
        var b = parseInt((dynSpans[1] || {}).textContent || '2', 10);

        svg.selectAll('circle.ball').interrupt();
        drawBalls(svg, a, b);

        var max_balls = (Math.floor(URN_H / (2 * r + line_offset)) - 1) * num_cols;
        var step = 0;
        while (a < max_balls && b < max_balls) {
          var color, sign, pos;
          if (Math.random() > b / (a + b)) {
            color = acolor; sign = -1; pos = a++;
          } else {
            color = bcolor; sign =  1; pos = b++;
          }
          step++;
          svg.append('circle').attr('class', 'ball')
            .attr('r', r)
            .attr('cx', URN_W / 2 + sign * (r + (pos % num_cols) * 2 * r))
            .attr('cy', r)                    /* start just inside the top edge */
            .style('stroke', 'black').style('stroke-width', 2)
            .style('fill', color)
            .transition().ease(d3.easeCubicOut).duration(400).delay(step * 8)
            .attr('cy', ballY(pos));
        }
        updateRatio(a, b);
      });
    }

    /* draggable parameter spans */
    makeDraggable(dynSpans[0], 1, 12, function (val) {
      a0 = val;
      drawBalls(svg, a0, b0);
      updateRatio(a0, b0);
    });
    makeDraggable(dynSpans[1], 1, 12, function (val) {
      b0 = val;
      drawBalls(svg, a0, b0);
      updateRatio(a0, b0);
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     Figure 2 – PolyaDynamics (time-series)
  ═══════════════════════════════════════════════════════════════════════ */

  function drawBaseline(svg, a, b) {
    svg.selectAll('.dyn').remove();
    var y0 = DYN_H * (1 - b / (a + b));

    svg.append('line').attr('class', 'dyn')
      .style('stroke', 'black').style('stroke-dasharray', '3,3').style('opacity', 0.8)
      .attr('x1', 0).attr('y1', y0)
      .attr('x2', (NUM_STEPS + 1) * 10).attr('y2', y0);

    var hgap = 8, hwidth = 65, vgap = 20, vheight = 26;
    var y0_t = (b > a) ? y0 + vgap + vheight : y0;

    svg.append('text').attr('class', 'dyn')
      .attr('x', DYN_W - hgap - hwidth + 5).attr('y', y0_t - vgap)
      .text('Y').attr('font-family', 'sans-serif').attr('font-size', '16px')
      .attr('fill', text_color)
      .append('tspan').text('0').style('font-size', '10px').attr('dx', '-.2em').attr('dy', '.7em');

    svg.append('text').attr('class', 'dyn')
      .attr('x', DYN_W - hgap - hwidth + 15).attr('y', y0_t - vgap)
      .text('= ' + d3.format(',.2f')(b / (a + b)))
      .attr('font-family', 'sans-serif').attr('font-size', '16px').attr('fill', text_color);

    svg.append('rect').attr('class', 'dyn')
      .attr('x', DYN_W - hwidth - hgap).attr('y', y0_t - vgap - 17)
      .attr('width', hwidth).attr('height', vheight)
      .attr('fill', 'none').style('stroke', text_color).style('stroke-width', 1);
  }

  function initPolyaDynamics(figureEl) {
    var container = figureEl.querySelector('.d3-component');
    if (!container) return;

    container.innerHTML = '';

    var dynSpans = figureEl.querySelectorAll('.idyll-dynamic');
    var a0 = parseInt((dynSpans[0] || {}).textContent || '1', 10);
    var b0 = parseInt((dynSpans[1] || {}).textContent || '2', 10);

    var svg = d3.select(container).append('svg')
      .attr('viewBox', '0 0 ' + DYN_W + ' ' + DYN_H)
      .attr('overflow', 'visible')
      .style('width', '100%')
      .style('height', 'auto')
      .style('display', 'block');

    svg.append('rect')
      .attr('width', DYN_W).attr('height', DYN_H).attr('fill', 'white')
      .style('stroke', '#ccc').style('stroke-width', 1);

    drawBaseline(svg, a0, b0);

    var btn = figureEl.querySelector('button.simulate');
    if (btn) {
      btn.addEventListener('click', function () {
        var a = parseInt((dynSpans[0] || {}).textContent || '1', 10);
        var b = parseInt((dynSpans[1] || {}).textContent || '2', 10);

        svg.selectAll('.dyn').interrupt();
        drawBaseline(svg, a, b);

        var duration = 2200 / NUM_STEPS;
        var bvals = [];
        for (var k = 0; k < NUM_RUNS; k++) bvals.push(b);

        for (var i = 0; i < NUM_STEPS; i++) {
          for (var j = 0; j < NUM_RUNS; j++) {
            var adrawn = Math.random() > bvals[j] / (a + b + i);
            if (!adrawn) bvals[j]++;

            svg.append('line').attr('class', 'dyn')
              .style('stroke', 'PowderBlue').style('opacity', 0.35)
              .transition().duration(duration).delay(i * duration)
              .attr('x1', i * 10)
              .attr('y1', DYN_H * (1 - (adrawn ? bvals[j] : bvals[j] - 1) / (a + b + i)))
              .attr('x2', (i + 1) * 10)
              .attr('y2', DYN_H * (1 - bvals[j] / (b + a + i + 1)));
          }

          (function (step, snapshot_b, a_val, b_val) {
            var sum = 0;
            for (var s = 0; s < snapshot_b.length; s++) sum += snapshot_b[s];
            var avg = sum / snapshot_b.length;
            svg.append('circle').attr('class', 'dyn')
              .transition().duration(duration).delay(step * duration)
              .attr('cx', step * 10)
              .attr('cy', DYN_H * (1 - avg / (b_val + a_val + step + 1)))
              .attr('r', 3).style('fill', 'Tomato');
          }(i, bvals.slice(), a, b));
        }
      });
    }

    makeDraggable(dynSpans[0], 1, 12, function (val) {
      a0 = val; drawBaseline(svg, a0, b0);
    });
    makeDraggable(dynSpans[1], 1, 12, function (val) {
      b0 = val; drawBaseline(svg, a0, b0);
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     Draggable .idyll-dynamic spans
  ═══════════════════════════════════════════════════════════════════════ */

  function makeDraggable(el, min, max, onChange) {
    if (!el) return;
    el.style.cursor     = 'ew-resize';
    el.style.userSelect = 'none';
    el.title            = 'Drag left/right to change value';

    el.addEventListener('mousedown', function (e) {
      var startX   = e.clientX;
      var startVal = parseInt(el.textContent, 10);

      function onMove(e2) {
        var delta  = Math.round((e2.clientX - startX) / 20);
        var newVal = Math.max(min, Math.min(max, startVal + delta));
        if (parseInt(el.textContent, 10) !== newVal) {
          el.textContent = newVal;
          onChange(newVal);
        }
      }
      function onUp() {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      }
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      e.preventDefault();
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     Bootstrap
  ═══════════════════════════════════════════════════════════════════════ */

  function bootstrap() {
    var root = document.getElementById('idyll-mount') || document;
    var figures = root.querySelectorAll('.figure');
    if (figures[0]) initPolyaUrn(figures[0]);
    if (figures[1]) initPolyaDynamics(figures[1]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }

}());
