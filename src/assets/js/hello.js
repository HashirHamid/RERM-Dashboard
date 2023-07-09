function dataTableInit(){
    $("#example1").DataTable({
      "responsive": true, "lengthChange": false, "autoWidth": false,
      "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
    $('#example2').DataTable({
      "paging": false,
      "lengthChange": false,
      "searching": true,
      "ordering": true,
      "info": false,
      "autoWidth": false,
      "responsive": true,
      "oLanguage":{
        "sSearch":""
      },
   
    });
  $("#example2").dataTable.ext.errMode = 'none';
  }

  $(document).ready(function () {             
    $('.dataTables_filter input[type="search"]').css(
       {'width':'10px','display':'inline-block'}
    );
  });
  

// function chalJaa(){
//     $(document).ready( function () {
//         $('#example2 tbody').on( 'click', 'button', function () {
//           var tr = $(this).closest('tr');
          
//           if ( $(tr).hasClass('child') ) {
//             tr = $(tr).prev();  
//           }
      
//           var data = table.row( tr ).data();
//           data[-1].on('click','button', function(){
            
//           })
//         } );
        
        
//         var table = $('#example2').DataTable({
//             "paging": false,
//       "lengthChange": false,
//       "searching": true,
//       "ordering": true,
//       "info": false,
//       "autoWidth": false,
//       "responsive": true,   
//         });
//         console.log(table); 
        
//         table.row(':eq(0)').child('<button>Click me</button>', 'child').show();
//       } );
// }