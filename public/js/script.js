  $(function () {
      console.log('loaded')

      $('.btnencode').on('click', () =>{
          let password = $('#password').val()
          let message = $('#message').val()
          let name = $('#name').val()
          let ob = {}
          ob.password = password
          ob.message = message
          ob.name = name
          $.post('/encode/', ob)
              .done(function( data ) {
                $('#message').val(data.message)
              });

      })
      $('.btndecode').on('click', () =>{
          let password = $('#password').val()
          let message = $('#message').val()
          let name = $('#name').val()
          let ob = {}
          ob.password = password
          ob.message = message
          ob.name = name
          $.post('/decode/', ob)
              .done(function( data ) {
                $('#message').val(data.message)
              });

      })

      $(".post-user").submit(function (event) {
          $.post('/encode/', $('.post-user').serialize())
          event.preventDefault()
      });

  })
