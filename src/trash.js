
movable_transformEndHandler(params) {
  let index=Number(params.target.id.substr(3));
  let transform=(/\((.+),\s*(.+),\s*(.+),\s*(.+),\s*(.+),\s*(.+)\)/g).exec(window.getComputedStyle(params.target,null).transform);
  let matrix=[1,0,0,1,0,0];
  if (transform) {
    transform.splice(0,1);
    matrix=[]
    for (let i = 0; i < transform.length; i++) {
      matrix.push(transform[i])
    }
  }

  this.store.dispatch(
    updateImage(index,matrix)
  )
}



  movable_transformHandler(params) {
    if (params.transform) {
      params.target.style.transform=params.transform;
    }
    let index=Number(params.target.id.substr(3));
  }



  image_loadHandler(event) {
    let index=Number(event.target.id.substr(3));
    let image=event.target;
    let scale=Math.max(this.state.addImagesDefaultSize.width/image.width,this.state.addImagesDefaultSize.height/image.height);
    let translateX=(this.state.addImagesDefaultSize.width-image.width)/2;
    let translateY=(this.state.addImagesDefaultSize.height-image.height)/2;
    image.style.width=image.naturalWidth+"px";
    image.style.height=image.naturalHeight+"px";
    this.movable_transformEndHandler(event)

    this.store.dispatch(
      updateImage(index,[scale,0,0,scale,translateX,translateY])
    );

  }
