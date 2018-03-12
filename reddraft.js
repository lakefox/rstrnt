function draft(e) {
  this.canvas = {
    width: 500,
    height: 500
  };
  this.init = function () {
    e.style.width = this.canvas.width+"px";
    e.style.height = this.canvas.height+"px";
    e.style.overflow = "hidden";
  }
  this.rect = function (id, x, y, width, height, color) {
    var d = document.createElement("div");
    d.setAttribute("id", id);
    d.style.position = "absolute";
    d.style.top = y+"px";
    d.style.left = x+"px";
    d.style.width = width+"px";
    d.style.height = height+"px";
    d.style.background = color;
    e.appendChild(d);
  }
  this.oval = function (id, x, y, width, height, color) {
    var d = document.createElement("div");
    d.setAttribute("id", id);
    d.style.position = "absolute";
    d.style.top = y+"px";
    d.style.left = x+"px";
    d.style.width = width+"px";
    d.style.height = height+"px";
    d.style.background = color;
    d.style.borderRadius = "50%";
    e.appendChild(d);
  }
  this.image = function (id, image, x, y, width, height) {
    var d = image.cloneNode();
    d.setAttribute("id", id);
    d.style.position = "absolute";
    d.style.top = y+"px";
    d.style.left = x+"px";
    d.style.width = width+"px";
    d.style.height = height+"px";
    e.appendChild(d);
  }
  this.text = function (id, text, x, y) {
    var d = document.createElement("div");
    d.setAttribute("id", id);
    d.style.position = "absolute";
    d.style.top = y+"px";
    d.style.left = x+"px";
    d.innerHTML = text;
    e.appendChild(d);
  }
  this.object = function (id, cb) {
    if (cb) {
      window[id] = cb;
    } else {
      return window[id];
    }
  }
  this.insertHTML = function (id, html) {
    var i = get(id);
    i.innerHTML = html;
  }
  this.css = function (id, style) {
    var i = get(id);
    i.style = i.getAttribute("style")+style;
  }
  this.move = function (id, x, y, z) {
    var i = get(id);
    if (x.toString() && y.toString()) {
      i.style.top = y+"px";
      i.style.left = x+"px";
      if (z) {
        i.style["z-index"] = z.toString();
      }
    } else {
      var xy = {
        x: parseInt(i.style.left.slice(0,-2)),
        y: parseInt(i.style.top.slice(0,-2)),
        z: parseInt(i.style["z-index"])
      }
      return xy;
    }
  }
  this.moveTo = function (id, time, x1, y1, x2, y2, cb) {
    var i = get(id);
    var m = (y2-y1)/(x2-x1);
    var b = y1-(x1*m);
    var c = 0;
    var lp = setInterval(() => {
      c+=((x2-x1)/time)*10;
      i.style.top = ((m*(x1+c))+b)+"px";
      i.style.left = (x1+c)+"px";
      if ((x1+c) >= x2) {
        clearInterval(lp);
        cb();
      }
    }, 10);
  }
  this.size = function (id, width, height) {
    var i = get(id);
    if (width && height) {
      i.style.width = width+"px";
      i.style.height = height+"px";
    } else {
      var size = {
        width: parseInt(i.style.width.slice(0,-2)),
        height: parseInt(i.style.height.slice(0,-2))
      };
      return size;
    }
  }
  this.color = function (id, color) {
    var i = get(id);
    if (color) {
      i.style.background = color;
    } else {
      return i.style.background;
    }
  }
  this.rotate = function (id, deg) {
    var i = get(id);
    var t = i.style.transform;
    if (deg) {
      var b = t.slice(0,t.indexOf("rotate"));
      var e = t.slice(t.indexOf("deg)")+4);
      i.style.transform = b+" rotate("+deg+"deg) "+e;
    } else {
      return t.slice(t.indexOf("rotate")+7,t.indexOf("deg)"));
    }
  }
  this.remove = function (id) {
    e.removeChild(get(id));
  }
  this.listen = function (id, evnt, cb) {
    window[id+evnt] = cb;
    get(id).addEventListener(evnt, cb);
  }
  this.dontListen = function (id, evnt) {
    get(id).removeEventListener(evnt, window[id+evnt]);
  }
  this.loop = function (amt, delay, cb) {
    var c = 0;
    var lp = setInterval(() => {
      c++
      if (c >= amt) {
        clearInterval(lp);
        cb(c, true);
      } else {
        cb(c, false);
      }
    },delay);
  }
  // Helps keep scenes inline
  this.done = function (que, func) {
    if (func) {
      window[que] = func;
    } else {
      window[que]();
    }
  }
  function get(id) {
    return e.querySelector("red>*[id="+id+"]");
  }
  this.get = get;
}
