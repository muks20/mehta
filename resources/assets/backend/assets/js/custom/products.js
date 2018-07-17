var Product = function() {
    var handleValidation = function() {
        $('.js-frm-create-product, .js-frm-edit-product').validate({
            ignore: [],
            debug: false,
            messages: {},
            rules: {
                name: {
                    required: true
                },
                category: {
                    required: true
                },
                description: {
                    required: true
                }
            },
            errorPlacement: function(error, element) { // render error placement for each input type
                if (element.hasClass("js-product-file")) {
                    element.closest(".js-product-image-li").find(".js-error").append(error);
                } else {
                    element.parent().append(error);
                }
            },
            submitHandler: function(form) {
                if ($('.js-frm-edit-product').length) {
                    var updatedImages = [];
                    var updatedIndex = 0;
                    var allExistingImagesOrder = [];
                    var existingIndex = 0;
                    $('.js-product-image-main-div .js-product-image-li.js-existing-product-image').each(function() {
                        var index = $(this).data("index");
                        var id = $(this).data("id");
                        var updatedFile = $(this).find('.js-product-file').val();
                        if (updatedFile) {
                            updatedImages[updatedIndex] = new Object();
                            updatedImages[updatedIndex].index = index;
                            updatedImages[updatedIndex].id = id;
                            updatedIndex++;
                        }
                        allExistingImagesOrder[existingIndex] = new Object();
                        allExistingImagesOrder[existingIndex].index = index;
                        allExistingImagesOrder[existingIndex].id = id;
                        existingIndex++;
                    });
                    $("#updated_product_images").val(JSON.stringify(updatedImages));
                    $("#existing_images_order").val(JSON.stringify(allExistingImagesOrder));
                }
                var orderArray = $("#sortable").sortable('toArray', { attribute: "data-index" });
                $("#image_order").val(JSON.stringify(orderArray));
                form.submit();
            }
        });
    };
    var formInitialization = function() {

    };
    var formEvents = function() {
        $(document).on('click', '.js-add-product-image', function(event) {
            var index = 0;
            if ($(".js-product-image-li").length) {
                var indexArray = $(".js-product-image-main-div .js-product-image-li").map(function() {
                    return $(this).data('index');
                }).get();
                var highestIndex = Math.max.apply(Math, indexArray);
                index = highestIndex + 1;
            }
            var productImageHtmlFormat = "";
            productImageHtmlFormat = ' <li class="panel ui-state-default liSort js-product-image-li" data-index="{index}" data-id="">';
            productImageHtmlFormat += '<div class="form-group sorter panel-body img-block">';
            productImageHtmlFormat += '<div class="col-sm-3"><img src="' + Site.no_image_url + '" width="150" class="center-block js-preview-image" data-index="{index}" /></div>';
            productImageHtmlFormat += '<div class="col-sm-9">';
            productImageHtmlFormat += '<div class="row">';
            productImageHtmlFormat += '<div class="col-sm-9"><div class="input-group js-file-input-group"><label class="input-group-btn"><span class="btn green">Browse&hellip; <input type="file" style="display: none;" class="form-control js-product-file" type="file" name="product_image[{index}]" multiple></span></label><input type="text" value="" class="form-control js-file-name" readonly></div></div>';
            productImageHtmlFormat += '<div class="col-sm-3"><a class="js-remove-product-image btn green" data-index="{index}" href="javascript:void(0)">Remove</a></div>';
            productImageHtmlFormat += '</div>';
            productImageHtmlFormat += '</div>';
            productImageHtmlFormat += '</div>';
            productImageHtmlFormat += '<div class="product-image-error js-error"></div>';
            productImageHtmlFormat += '</li>';

            var productImageHtml = productImageHtmlFormat.replace(/{index}/g, index);
            $("#sortable").append(productImageHtml);
            $('[name="product_image[' + index + ']"]').each(function() {
                $(this).rules('add', {
                    required: true,
                    messages: {
                        required: "This field is required."
                    }
                });
            });

            var newlyAddedImages = $("#newly_added_images").val() + ($("#newly_added_images").val() == "" ? index : "," + index);
            $("#newly_added_images").val(newlyAddedImages);
            checkRemoveImageButton();
        });

        $(document).on('click', '.js-remove-product-image', function() {
            if ($('.js-frm-edit-product').length) {
                var imageObject = $(this).closest('.js-product-image-li');
                var imageIndex = imageObject.data("index");
                if (imageObject.data("id") != "") {
                    var removedImages = $("#removed_images").val() + ($("#removed_images").val() == "" ? imageIndex : "," + imageIndex);
                    $("#removed_images").val(removedImages);
                } else {
                    var newlyAddedImages = $("#newly_added_images").val().split(",");
                    var removedImageIndex = newlyAddedImages.indexOf(imageIndex);
                    newlyAddedImages.splice(removedImageIndex, 1);
                    $("#newly_added_images").val(newlyAddedImages.join());
                }
            }
            $('.js-product-image-main-div .js-product-image-li').filter('[data-index="' + $(this).data("index") + '"]').remove();
            checkRemoveImageButton();
        });

        $(document).on('change', '.js-product-file', function(e) {
            $(this).closest('.js-file-input-group').find(".js-file-name").val($(this).val().replace(/C:\\fakepath\\/i, ''));
            var index = $(this).closest(".js-product-image-li").data("index");
            if (this.files && this.files[0]) {
                $.each(this.files, function() {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        let imageObject = $(".js-preview-image").filter("[data-index=" + index + "]");
                        imageObject.prop("src", e.target.result);
                    }
                    reader.readAsDataURL(this);
                });
            }
        });
    };

    var checkRemoveImageButton = function() {
        if ($('.js-product-image-main-div .js-product-image-li').length > 1) {
            $('.js-product-image-main-div .js-product-image-li .js-remove-product-image').show();
        } else {
            $('.js-product-image-main-div .js-product-image-li .js-remove-product-image').hide();
        }
    };

    return {
        init: function() {
            handleValidation();
            formInitialization();
            formEvents();
        }
    }
}();

$(document).ready(function() {
    Product.init();

    $("input[type='file']").on('change', function(event) {
        $("input[type='submit']").prop("disabled", "disabled");
    });

    $("input[type='file']").on('fileloaded', function(event, file, previewId, index, reader) {
        $("input[type='submit']").prop("disabled", "");
    });
});