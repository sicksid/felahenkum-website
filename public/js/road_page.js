(function ($) {
    var past_dates_rows, new_dates_button, past_dates_button, new_dates_button, data

    data = {
        buttons: {
            past: document.getElementById("past-dates-link"),
            new: document.getElementById("new-dates-link")
        },
        tables: {
            rows: {
                past: document.querySelectorAll("#past-dates .table tr"),
                new: document.querySelectorAll("#new-dates .table tr")
            },
            containers: {
                past: document.querySelector("#past-dates .table"),
                new: document.querySelector("#new-dates .table")
            }
        },
        modal: {
            flyer: document.getElementById('flyer-image'),
            container: $(document.getElementById('poster-modal')),
            loader: document.querySelector('#poster-modal .loader')
        }
    }

    data.modal.api = $(data.modal.container)
    var context = this

    function toggleDatesButtonHandler (event) {
        var id = event.target.id

        activateButton(event.target)

        if (id == "new-dates-link") {
            hideContainer(data.tables.containers.past)
            showContainer(data.tables.containers.new)
            deactivateButton(data.buttons.past)
        } else if (id == "past-dates-link") {
            showContainer(data.tables.containers.past)
            hideContainer(data.tables.containers.new)
            deactivateButton(data.buttons.new)
        }
        
    }

    function activateButton (element) {
        element.parentElement.classList.add("active")
    }
    function deactivateButton (element) {
        element.parentElement.classList.remove("active")
    }

    function showContainer (element) {
        element.style = "display: table;" 
    }

    function hideContainer (element) {
        element.style = "display: none;" 
    }

    function showLoader() {
        data.modal.loader.style = "display: block;"
        data.modal.flyer.style = "display: none;"
    }

    function hideLoader() {
        data.modal.loader.style = "display: none;"
        data.modal.flyer.style = "display: block;"
    }

    function changeModalPoster(image_url) {
        showLoader()
        data.modal.flyer.src = image_url
    }

    data.modal.flyer.onload = function(event) {
        hideLoader()
    }

    data.tables.rows.new.forEach(function (row) {
        row.onclick = function (event) {
            var target = event.target
            
            if (event.target.nodeName == "TD") {
                target = event.target.parentElement
            }

            var image_data = JSON.parse(target.getAttribute("data-image"))
            changeModalPoster(image_data.secure_url)
            data.modal.container.modal('show')
        }
    })
    data.tables.rows.past.forEach(function (row) {
        row.onclick = function (event) {
            var target = event.target
            
            if (event.target.nodeName == "TD") {
                target = event.target.parentElement
            }

            var image_data = JSON.parse(target.getAttribute("data-image"))
            changeModalPoster(image_data.secure_url)
            data.modal.container.modal('show')
        }
    })
    data.buttons.past.onclick = toggleDatesButtonHandler
    data.buttons.new.onclick = toggleDatesButtonHandler
})(jQuery)