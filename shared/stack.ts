export class Stack<T> {
  private elements: T[] = [];

  public push(element: T) {
    this.elements.push(element);
  }

  public pop(): T | undefined {
    return this.elements.pop();
  }

  public peek(): T | undefined {
    return this.elements[this.elements.length - 1];
  }

  public size(): number {
    return this.elements.length;
  }
}
