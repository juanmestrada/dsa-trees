/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    // tree is empty
    if(!this.root) return 0;

    const DFS = (node) => {
      // no child nodes, depth is level of node itself
      if (node.left === null && node.right === null) return 1;

      // only right child node, increment current depth and continue to right child
      if (node.left === null) return DFS(node.right) + 1;

      // only left child node, increment current depth and continue to left child
      if (node.right === null) return DFS(node.left) + 1;
      
      // return the min depth between left subtree and right subtree
      return (Math.min(DFS(node.left), DFS(node.right)) + 1);
    }

    // initial dfs recursive call
    return DFS(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
     // tree is empty
     if(!this.root) return 0;

     const DFS = (node) => {
       // no child nodes, depth is level of node itself
       if (node.left === null && node.right === null) return 1;
 
       // only right child node, increment current depth and continue to right child
       if (node.left === null) return DFS(node.right) + 1;
 
       // only left child node, increment current depth and continue to left child
       if (node.right === null) return DFS(node.left) + 1;
       
       // return the max depth between left subtree and right subtree
       return (Math.max(DFS(node.left), DFS(node.right)) + 1);
     }
 
     // initial dfs recursive call
     return DFS(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    // total sum
    let res = 0;

    const DFS = (node) => {
      // node is null
      if (node === null) return 0;

      // left subtree path
      const leftSubTree =  DFS(node.left);
      // right subtree path
      const rightSubTree =  DFS(node.right);

      // get max between current res and current path 
      res = Math.max(res, node.val + leftSubTree + rightSubTree);

      return Math.max(0, leftSubTree + node.val, rightSubTree + node.val);
    }

    // initial dfs recursive call
    DFS(this.root);

    return res;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    // tree is empty
    if (this.root === null) return null;
    
    let res = null;
    
    const DFS = (node) => {
      // node is null
      if(!node) return;
      
      // traverse left subtree
      if(node.left) DFS(node.left);

      // traverse right subtree
      if(node.right) DFS(node.right);

      // update current min val (res)
      if(node.val > lowerBound && (node.val < res || res === null)){
        res = node.val;
      }
    }
    
    // initial recursive call 
    DFS(this.root);

    return res;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    const values = [];

    function traverse(node) {
      if (node) {
        values.push(node.val);
        traverse(node.left);
        traverse(node.right);
      } else {
        values.push("#");
      }
    }

    traverse(tree.root);
    
    return values.join(" ");
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    if (!stringTree) return null;

    const values = stringTree.split(" ");

    function buildTree() {
      // building a tree
      if (values.length) {
        const currentVal = values.shift();

        if (currentVal === "#") return null;

        // remember to convert values back into numbers
        let currentNode = new BinaryTreeNode(+currentVal);
        currentNode.left = buildTree();
        currentNode.right = buildTree();

        return currentNode;
      }
    }

    const root = buildTree();
    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2, currentNode = this.root) {
    // tree is empty
    if (currentNode === null) return null;

    // root is one of the target nodes
    if (currentNode === node1 || currentNode === node2) return currentNode;

    // traverse left subtree
    const left = this.lowestCommonAncestor(node1, node2, currentNode.left);

    // traverse right subtree
    const right = this.lowestCommonAncestor(node1, node2, currentNode.right);

    // if neither left nor right is null, currentNode is the ancestor
    if (left !== null && right !== null) return currentNode;
    
    // if one node is not null, return it
    if (left !== null || right !== null) return left || right;
    
    // left and right are both null, return null
    if (left === null && right === null) return null;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
