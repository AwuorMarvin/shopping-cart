$(function(){
  $('#cartcontent').datagrid({
    singleSelect:true,
    showFooter:true
    });

    $('.item').draggable({
      revert:true,
      proxy:'clone',
      onStartDrag:function(){
        $(this).draggable('options').cursor = 'not-allowed';
        $(this).draggable('proxy').css('z-index',10);
        },
        onStopDrag:function(){
            $(this).draggable('options').cursor='move';
                }
            });

            $('.cart').droppable({
                onDragEnter:function(e,source){
                    $(source).draggable('options').cursor='auto';
                },
                onDragLeave:function(e,source){
                    $(source).draggable('options').cursor='not-allowed';
                },
                onDrop:function(e,source){
                    var name = $(source).find('p:eq(0)').html();
                    var price = $(source).find('p:eq(1)').html();
                    addProduct(name, parseFloat(price.split('.')[1]));
                }
            });

            $('.button').click(function(e){
                var price = $(this).data('price');
                var name = $(this).data('name');
                addProduct(name, parseFloat(price));
                alert(name+ " has been added to your shopping cart.");
            });
            $(document).on('click', '.remove', function () {
            $(this).closest("tr").remove();
            });

        });
     
        function addProduct(name,price){
            var dg = $('#cartcontent');
            var data = dg.datagrid('getData');
            function add(){
                for(var i=0; i<data.total; i++){
                    var row = data.rows[i];
                    if (row.name == name){
                        row.quantity += 1;
                        return;
                    }
                }
                data.total += 1;
                data.rows.push({
                    name:name,
                    quantity:1,
                    price:price,
                    action:"<a href='#' style='color:red' class='remove'>X</a>",
                });
            }
            add();
            dg.datagrid('loadData', data);
            var cost = 0;
            var rows = dg.datagrid('getRows');
            for(var i=0; i<rows.length; i++){
                cost += rows[i].price*rows[i].quantity;
            }
            dg.datagrid('reloadFooter', [{name:'Total',price:cost}]);
        }

//         $(document).on("click", ".remove", function (evt) {
//     var $this = $(evt.currentTarget),
//         cartItem = $this.parent(),
//         newPrice = parseInt($this.data('price'));
    
//     cartItem.remove();
//     Total = Total - newPrice;
//     $(".total").text(Total + "Kshs.");
// });
   
