// -----------------
// Big thanks go to https://github.com/deepsweet/microjungle
// -----------------

export default class RenderingEngine {
  constructor(templateDirectory) {
    this.templateDirectory = templateDirectory
  }

  renderTemplate(templateName, templateData) {
    templateData = this.templateDirectory.get(templateName, templateData)
    return this.render(templateData)
  }

  render(templateData) {
    let result = this.monkeys(templateData)
    return result
  }

  generateElement(item) {
  
    var elem = document.createElement(item.shift());
    
    if (isObject(item[0])) {
      var attrs = item.shift();
      var attrName;
      var attrValue;
    
      // attr="value"
      for (attrName in attrs) {
        attrValue = attrs[attrName];
    
        if (typeof attrValue === 'string' ||
           (typeof attrValue === 'number' && isFinite(attrValue))) {
    
          elem.setAttribute(attrName, attrValue);
        }
      }
    }
  
    return elem
  
  }
  
  /**
   * This is a recursive function...
   * Initially the template argument is blank,
   * but with subsequent nested calls, it is passed
   * what the fragment that is currently being worked on.
   *
   */
  monkeys(template, target) {
    target = target || document.createDocumentFragment();
  
    if (isNotArray(template)) {
  
      this.monkeys(item, target);
  
    } else {

      template.forEach((function(item) {
        this.parseNode(item, target)
      }).bind(this))
  
    }
    return target
  }

  parseNode(item, target) {
    if (isTextNode(item)) {

      target.appendChild(document.createTextNode(item))

    } else if (isFalse(item)) {
      return undefined

    } else if (isElement(item)) {
      var elem = this.generateElement(item)
      target.appendChild(this.monkeys(item, elem))
      return

    } else if (isNode(item)) {
      target.appendChild(item);
      return
      
    }

  }
}

function objectToString(object) {
  return Object.prototype.toString.call(object)
}

function isArray(object) {
  if (objectToString(object) === '[object Array]') {
    return true
  } else  {
    return false
  }
}
function isNotArray(object) {
  !isArray(object)
}
function isObject(object) {
  if (objectToString(object) === '[object Object]') {
    return true
  } else  {
    return false
  }
}
function isNotObject(object) {
  !isObject(object)
}

function isTextNode(item) {
  if (typeof item === 'string' ||
     (typeof item === 'number' && isFinite(item))) {

    return true
  } else {
    return false
  }
}
function isFalse(item) {
  if (!item) {
    true
  } else {
    false
  }
}
function isElement(item) {
  if (typeof item[0] === 'string') {
    return true
  } else {
    return false
  }
}

function isNode(item) {
  if (item.nodeType) {
    return true
  } else {
    return false
  }

}


