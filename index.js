'use strict';
var l = [];
var num = 1;
var meta = 0;
var gpos = 0;
var i = 0;
var j = 0;

function display(str) {
    document.getElementById('disp').innerHTML = str
    l.push(String(str))
}

function dimarraytypein(type, inp) { //For dimensional phase
    let r = [...type]
    let alx = false
    let not1 = false
    for (let i = r.length - 1; i >= 0; i--) {
        if (!not1) {
            if (r[i] == 0) {
                delete r[i]
                continue
            }
            else {not1 = true}
        }
        if (alx) {
            r[i] = '10'
        } else {
            if (r[i] == 'x') {
                alx = true
                r[i] = String(l[Math.floor(inp + gpos)])
            } else {
                r[i] += 1
                r[i] = String(r[i])
            }
        }
    }
    r = r.filter((e) => e !== undefined)
    if (type[0] == 'x') {return '{10, 10, ' + r.join(', ') + '}'}
    else {return '{10, ' + String(l[Math.floor(inp + gpos)]) + ', ' + r.join(', ') + '}'}
}

function nextdimarray(arr) { //For dimensional phase
    let r = arr
    for (let i = 0; i < r.length; i++) {
        if (typeof r[i] === 'number') {
            if (r[i] >= 10) {r[i] = 'x'; break}
            else {r[i]++; break}
        }
        else {
            r[i] = 0
        }
    }
    return r
}

function dimarrfactor(arr) { //For dimensional phase
    let a = arr.map((x, i) => {
        if (x == 'x') {return 1}
        else return 1.5 ** (x * (1 + i))
    })
    let r = 1
    a.forEach(e => {r *= e})
    return r
}

//Main
setInterval(() => {
    if (meta == 0) {
        num *= 1.001 + Math.log(num) / 100
        display(num.toFixed(2))
        if (num >= 90) {
            meta ++
            gpos = l.length
            display('100')}
    }
    else if (meta == 1) {
        num *= 1.001 + Math.log(num) / 100
        display(num.toFixed())
        if (num >= 1e9) {meta ++}
    }
    else if (meta == 2) {
        num *= 1.001 + Math.log(num) / 100
        display(String((num / (10 ** Math.floor(Math.log10(num)))).toFixed(2)) + 'e' + String(Math.floor(Math.log10(num))))
        if (num >= 1e100) {
            meta ++
            i = 1
            j = gpos + i
        }
    }
    else if (meta == 3) {
        if (i > 10) {
            meta ++
            i = gpos
        }
        if (j > l.length) {i ++; j = gpos + 1.2 ** i}
        else {
            display('10{' + String(i+1) + '}' + l[Math.floor(j)])
            j += 1.2 ** (2 ** (i - 1))
        }
    }
    else if (meta == 4) {
        if (i > l.length) {
            meta ++
            i = [0, 1, 0, 0, 0, 0, 0, 0, 0]
            j = dimarrfactor(i)
        }
        else {
            display('{10, 10, ' + l[Math.floor(i)] + '}')
            i += 2
        }
    }
    else if (meta == 5) {
        if (i == ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'] && j > l.length) {meta ++}
        else {
            display(dimarraytypein(i, j))
            j += dimarrfactor(i)
            if (j > l.length) {
                j = dimarrfactor(i)
                i = nextdimarray(i)
            }
        }
    } 
}, 70)