function ExecuteLogin() {
    $.ajax(
        {
            method: "POST",
            url: "https://quiz.iqualify.nl/api/authenticate",
            contentType: "application/json",
            data: JSON.stringify(
                {
                    "username": $("#tbUname").val(),
                    "password": $("#tbPsw").val()
                }
            ),
            success: function (result, xhr) {
                let playerName = $("#tbUname").val().toLowerCase().toLowerCase();
                playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1);

                setCookie("playerName", playerName, 1);

                var form = '<input type="hidden" name="key" value="' + result + '">';

                $('<form action="' + window.location.origin + "/authorise" + '" method="POST">' + form + '</form>').appendTo($(document.body)).submit();
            },
            error: function () {
                alert("Wrong credentials, please try again.");
                $("#tbUname,#tbPsw").animate(
                    {
                        "border-style": "solid",
                        "border-color": "red",
                        "border-width": "4.5px"
                    },
                    {
                        done: function () {
                            $("#tbUname,#tbPsw").animate(
                                {
                                    "border-style": "solid",
                                    "border-color": "red",
                                    "border-width": "3px"
                                }
                            );
                        }
                    }
                );
            }
        }
    );
}

$(document).ready(function () {
    $("#tbUname,#tbPsw").on('keyup', function (e) {
        if (e.keyCode === 13) {
            ExecuteLogin();
        }
    });

    $("#loginButton").click(ExecuteLogin);
});