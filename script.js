var data = {"total":0,"rows":[]};
var totalCost = 0;


$(function(){
  $('#cartcontent').datagrid({
    singleSelect:true
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
              remove: '<a href="#" class="remove" onclick="removeProduct(this, event)">X</a>'
    });
  }
  add();
  totalCost += price;
  $('#cartcontent').datagrid('loadData', data);
  $('div.cart .total').html('Total: Kshs.'+totalCost);
}

function removeProduct(el, event) {
  var tr = $(el).closest('tr');
  var name = tr.find('td[field=name]').text();
  var price = tr.find('td[field=price]').text();
  var quantity = tr.find('td[field=quantity]').text();
  for(var i = 0; i < data.total; i++){
      var row = data.rows[i];
      if (row.name == name) {
          data.rows.splice(i, 1);
          data.total--;
          break;
      }
  }
  totalCost -=  price * quantity;
  $('#cartcontent').datagrid('loadData', data);
  $('div.cart .total').html('Total: Kshs.'+totalCost);
}