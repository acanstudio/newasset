/*
* @Author: yy
* @Date:   2016-08-04 14:30:46
* @Last Modified by:   yy
* @Last Modified time: 2016-08-12 16:20:00
*/
$(document).ready(function() {
	 // $(".order_infor a").click(function(event) {
	 // 	$(this).parents(".order_infor").siblings('.Page').eq($(this).index()).show();
	 // });

	  		$(".select").click(function(event) {
			    $(this).parents(".order_mode_ds").hide().siblings('.ds_con').show();
			    });
			    $(".allds_con .a_close").click(function(event) {
			    	$(".allds_con").hide().siblings('.order_mode_ds ').show();
			    });
			     $(".map_close").click(function(event) {
			    	$(".order_mode").show();
			    	$(".Map_out").hide();
			    }); 
			     $(".name").click(function(event) {
			     	$(".order_mode").hide();
			    	$(".order_taker_list").show();
			     });
			     $(".taker_close").click(function(event) {
			    	$(".order_mode").show();
			    	$(".order_taker_list").hide();
			    }); 
			     $(".order_mode_ds .close").click(function(event) {
			     	 $(".Ds_outer").hide().siblings('.ds_con').show();
			     });
			     $(".daishou_list_item_pointer").click(function(event) {
			    	$(".order_mode").hide();
			    	$(".Map_out").show();
			    });


			     $(".add").click(function(event) {
              // alert(1);
                $(".address_add").show();
            });
            $(".address_add .close").click(function(event) {
            	 event.stopPropagation();
                $(this).parents(".address_add").hide();
            });
            $(".address_conin .label b").click(function(event) {
            	event.stopPropagation();
                $(".address_edit").show();
            });
            $(".address_edit .close").click(function(event) {
            	 event.stopPropagation();
                $(".address_edit").hide();
            }); 

            $(".Close").click(function(event) {
            	$(this).parents(".Page").hide().siblings('.order_infor').show();
            });

            $(".express").click(function(event) {
            	$(".Address").show();
            });
            $(".order_address .address_con .close").click(function(event) {
            	$(".Address").hide();
            	$(".order_infor").show();
            });
});