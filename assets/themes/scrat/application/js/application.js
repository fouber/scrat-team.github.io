/*!
 * JavaScript for Bootstrap's docs (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under the Creative Commons Attribution 3.0 Unported License. For
 * details, see http://creativecommons.org/licenses/by/3.0/.
 */
 !function ($) {
    $(function () {
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
            var msViewportStyle = document.createElement("style");
            msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));
            document.querySelector("head").appendChild(msViewportStyle);
        }

        // by david
        $(function () {
            var prevH = 0;
            var prevID = "";

            $(".bs-docs-content :header").each(function (index) {
                var currH = parseInt(this.tagName.charAt(1), 10);
                var currID = "h_" + index + "_" + currH;
                var $li = $("<li/>").append($("<a/>", {
                    "href": "#" + currID
                }).text($(this).text()));

                $(this).attr("id", currID);

                if (currH > prevH) {
                    if (prevID == "") {
                        var $ul = $("<ul/>", {"class": "nav bs-docs-sidenav"}).append($li);
                        $(".bs-docs-sidebar").prepend($ul);
                    } else {
                        var $ul = $("<ul/>", {"class": "nav"}).append($li);
                        $("a[href=#" + prevID + "]").after($ul);
                    }
                } else if (currH == prevH) {
                    $("a[href=#" + prevID + "]").parent().after($li);
                } else {
                    $("a[href=#" + prevID + "]").parent().parent().parent().after($li);
                }

                prevH = currH;
                prevID = currID;
            });
        });

        {
            var $window = $(window);
            var $body   = $(document.body);

            var navHeight = $(".navbar").outerHeight(true) + 10;
        }

        $body.scrollspy({
            target: ".bs-docs-sidebar",
            offset: navHeight
        });

        $window.on("load", function () {
            $body.scrollspy("refresh")
        });

        $(".bs-docs-container [href=#]").click(function (e) {
            e.preventDefault()
        });

        setTimeout(function () {
            var sidebar = $(".bs-docs-sidebar");

            sidebar.affix({
                offset: {
                    top: function () {
                        var offsetTop       = sidebar.offset().top;
                        var sideBarMargin   = parseInt(sidebar.children(0).css("margin-top"), 10);
                        var navOuterHeight  = $(".bs-docs-nav").height();

                        return (this.top = offsetTop - navOuterHeight - sideBarMargin)
                    },
                    bottom: function () {
                        return (this.bottom = $(".bs-docs-footer").outerHeight(true))
                    }
                }
            })
        }, 100);

/*
        setTimeout(function () {
            $(".bs-top").affix()
        }, 100);

        // tooltip-demo
        $(".tooltip-demo").tooltip({
            selector: "[data-toggle=tooltip]",
            container: "body"
        });

        $(".tooltip-test").tooltip();
        $(".popover-test").popover();

        $(".bs-docs-navbar").tooltip({
            selector: "a[data-toggle=tooltip]",
            container: ".bs-docs-navbar .nav"
        });

        // popover demo
        $("[data-toggle=popover]").popover();

        // loading example button status demo
        $("#loading-example-btn").click(function () {
            var b = $(this);
            b.button("loading");
            setTimeout(function () {
                b.button("reset")
            }, 3000)
        })*/
    })
}(jQuery);
