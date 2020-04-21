window.dom = {
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim(); //去掉空格
    return container.content.firstChild;
  },
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  append(parent, node) {
    parent.appendChild(node);
  },
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node); //node会从原来的地方移开
  },
  remove(node) {
    node.parentNode.removeChild(node);
    return node; //将节点放入缓存，备用
  },
  empty(node) {
    //const { childNodes } = node; const childNodes = node.childNodes;
    const array = []; //存放删掉的儿子节点备用
    let x = node.firstChild;
    while (x) {
      //当节点存在时删除
      array.push(dom.remove(node.firstChild));
      x = node.firstChild; //删除的始终为第一个节点
    }
    return array;
  },
  attr(node, name, value) {
    //读写属性
    if (arguments.length === 3) {
      //写
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      //读
      return node.getAttribute(name);
    }
  },
  text(node, string) {
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string; //IE
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      node.style[name] = value;
      //dom.style(div,'color','red')
    } else if (arguments.length == 2) {
      if (typeof name === "string") {
        return node.style[name];
        //dom.style(div,'color')
      } else if (name instanceof Object) {
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
        //dom.style(div,{color:'red'})
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  sibling(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < List.length; i++) {
      if (list[i] === node) {
        break;
      }
      return i;
    }
  },
};
