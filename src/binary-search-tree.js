const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  head = null;

  root() {
    return this.head;
  }

  add(data) {
    this.head = addElement(this.head, data);

    function addElement(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (node.data < data) {
        node.right = addElement(node.right, data);
      } else {
        node.left = addElement(node.left, data);
      }
      return node;
    }
  }

  has(data) {
    return searchData(this.head, data);

    function searchData(node, data) {
      if (!node) return false;

      if (node.data === data) return true;

      return node.data < data
        ? searchData(node.right, data)
        : searchData(node.left, data);
    }
  }

  find(data) {
    return searchData(this.head, data);

    function searchData(node, data) {
      if (!node) return null;

      if (node.data === data) return node;

      return node.data < data
        ? searchData(node.right, data)
        : searchData(node.left, data);
    }
  }

  remove(data) {
    this.head = removeData(this.head, data);

    function removeData(node, data) {
      if (!node) return null;

      if (node.data > data) {
        node.left = removeData(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeData(node.right, data);
        return node;
      } else {
        if (!node.left & !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let maxElem = node.left;
        while (maxElem.right) {
          maxElem = maxElem.right;
        }
        node.data = maxElem.data;
        node.left = removeData(node.left, maxElem.data);
        return node;
      }
    }
  }

  min() {
    let current = this.head;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    let current = this.head;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree,
};
