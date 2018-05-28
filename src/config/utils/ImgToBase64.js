export const ImgToBase64 = ((file, maxLen, callBack)=> {
        var img = new Image();
        var reader = new FileReader();//读取客户端上的文件
        reader.onload = function () {
            var url = reader.result;//读取到的文件内容.这个属性只在读取操作完成之后才有效,并且数据的格式取决于读取操作是由哪个方法发起的.所以必须使用reader.onload，
                img.src = url;//reader读取的文件内容是base64,利用这个url就能实现上传前预览图片
                if(!img.width||!img.height){
                    layer.open({
                        content:"图片格式错误,请重新选择",
                        skin:"msg",
                        time:2,
                        msgSkin:"error"
                    })
                    return false;
                };
            };
        img.onload = function () {
            //生成比例
            var width = img.width, height = img.height;
            //计算缩放比例
            var rate = 1;
            if (width >= height) {
                if (width > maxLen) {
                    rate = maxLen / width;
                }
            } else {
                if (height > maxLen) {
                    rate = maxLen / height;
                }
            };
            img.width = width * rate;
            img.height = height * rate;
            //生成canvas
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            var base64 = canvas.toDataURL('image/jpeg', 0.9);
            callBack(base64);
        };
        reader.readAsDataURL(file);
    })