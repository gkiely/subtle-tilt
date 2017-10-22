


class Tilter{
  constructor(el, options){
    this.defaultTransform = this.getTransform({
        perspective: 0,
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
    });
    this.transform = this.defaultTransform;
    this.lastTilt = this.defaultTransform;
    this.el = el;
    this.options = options;
    this.rect = this.el.getBoundingClientRect();
    this.addEventListeners(el);
    this.clientX = 0;
    this.clientY = 0;
    this.modernTransform = this.el.style.transform !== undefined;
    // this.glare = this.el.parentNode.querySelector('.tilt-glare');
  }
  addEventListeners(){
    this.onMouseEnterBind = this.onMouseEnter.bind(this);
    this.onMouseMoveBind = this.onMouseMove.bind(this);
    this.onMouseLeaveBind = this.onMouseLeave.bind(this);
    this.onWindowResizeBind = this.onWindowResize.bind(this);

    this.el.addEventListener('mouseenter', this.onMouseEnterBind);
    this.el.addEventListener('mousemove', this.onMouseMoveBind);
    this.el.addEventListener('mouseleave', this.onMouseLeaveBind);
    // window.addEventListener('resize', this.onWindowResizeBind);
  }
  removeEventListeners(){
    this.el.removeEventListener("mouseenter", this.onMouseEnterBind);
    this.el.removeEventListener("mousemove", this.onMouseMoveBind);
    this.el.removeEventListener("mouseleave", this.onMouseLeaveBind);
    // window.removeEventListener("resize", this.onWindowResizeBind);
  }

  onWindowResize(e){
    this.reset()
  }
  onMouseEnter(e){
    this.rect = this.el.getBoundingClientRect();
    this.transform = this.defaultTransform;
  }
  onMouseMove(e){
    this.clientX = e.clientX;
    this.clientY = e.clientY;
    this.renderRAF = window.requestAnimationFrame(() => this.requestAnimationFrame());
  }
  onMouseLeave(e){
    this.reset()
  }

  getTransform(move, x, y, width, height){
    let tilt = {
      perspective: move.perspective,
      rotateX : move.rotateX ? 2 * move.rotateX / height * y - move.rotateX : 0,
      rotateY : move.rotateY ? 2 * move.rotateY / width * x - move.rotateY : 0,
      rotateZ : move.rotateZ ? 2 * move.rotateZ / width * x - move.rotateZ : 0,
      translateX : move.translateX ? 2 * move.translateX / width * x - move.translateX : 0,
      translateY : move.translateY ? 2 * move.translateY / height * y - move.translateY : 0,
      translateZ : move.translateZ ? 2 * move.translateZ / height * y - move.translateZ : 0,
    };
    return 'perspective(' + tilt.perspective + 'px)' +
            ' translate3d(' + tilt.translateX + 'px,' + tilt.translateY + 'px,' + tilt.translateZ + 'px)' +
            ' rotate3d(1,0,0,' + tilt.rotateX + 'deg)' +
            ' rotate3d(0,1,0,' + tilt.rotateY + 'deg)' +
            ' rotate3d(0,0,1,' + tilt.rotateZ + 'deg)';
  }
  render(){
    if(this.modernTransform){
      this.el.style.transform = this.transform;
    }
    else{
      this.el.style.webkitTransform = this.transform;
    }
  }
  cancelFrame(){
    if(this.renderRAF !== null) {
      cancelAnimationFrame(this.renderRAF);
    }
  }
  reset(){
    this.cancelFrame();
    this.transform = this.defaultTransform;
    setTimeout(() => this.render(), 60);
  }
  requestAnimationFrame(e){
    let move = this.options.movement;
    let x = (this.clientX - this.rect.left);
    let y = (this.clientY - this.rect.top);
    this.transform = this.getTransform(move, x, y, this.rect.width, this.rect.height);        
    if(!_.isEqual(this.transform, this.prevTransform)){
      this.cancelFrame();
      this.render(this.transform);
      this.prevTransform = this.transform;
    }
  }
}


let Tilt = window.Tilt = function(query, options){
  let arr = [].slice.call(document.querySelectorAll(query));
  arr.map(el => new Tilter(el, options));
}

export default Tilt;