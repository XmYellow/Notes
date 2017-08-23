/**
<div class="content">
    <div class="slide_block">
        <div class="blue_block"></div>
        <div class="slider slider_bg"></div>
        <div class="slider_text"><span>移动滑块，获取验证码输入框</span></div>
    </div>
</div>
*/

$(document).ready(function() {
	// 一些控制全局变量
	var isMove = false; // 鼠标是否拖动验证码
	var x = 0; // 鼠标点击时滑块x轴坐标

	var slide_block = $('.slide_block');
	var green_block = $('.blue_block');
	var slider = $('.slider');
	var slider_text = $('.slider_text');
	var maxDistance = slide_block.width() - slider.width(); // 滑块最长滑动距离

	// 鼠标点击下时记录下水平x轴位置
	slider.mousedown(function(e) {
		isMove = true;
		x = e.pageX - parseInt(slider.css('left'), 10);
	});
	slider_text.mousedown(function(e) {
		isMove = true;
		x = e.pageX - parseInt(slider_text.css('left'), 10);
	});

	// 鼠标滑动时滑块跟着滑动，绿块宽度增加
	$(document).mousemove(function(e) {
		var move_x = e.pageX - x; // 计算鼠标滑动的距离
		if (isMove) {
			if (move_x > 0 && move_x <= maxDistance) {
				slider.css('left', move_x);
				green_block.css('width', move_x);
			} else if (move_x > maxDistance) {
				slider.css('left', 325);
				green_block.css('width', 325);
				sliderOK();
			} else if (move_x < 0) {
				slider.css('left', 0);
				green_block.css('width', 0);
			}
		}
	}).mouseup(function(e) {
		isMove = false;
		var release_x = e.pageX - x;
		if (release_x < maxDistance) {
			slider.animate({
				'left': 0
			}, 425);
			green_block.animate({
				'width': 0
			}, 425);
		}
	});

	// 验证成功清除鼠标绑定事件
	var sliderOK = function() {
		slider.removeClass('slider_bg').addClass('slider_ok_bg');

		// 显示调用接口中样式
		// 调用接口后台验证
		slider_text.find('span').text('验证通过');
		slider_text.css('color', 'white');
		$(document).unbind('mousemove');
		$(document).unbind('mouseup');
	}

});