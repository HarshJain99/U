class u_validation {
  constructor(value = '', errMsgTitle = '', id = '') {
    this.value = value;
    this.title = errMsgTitle;
    this.id = id;
  }
  typeof(type, errMsg) {
    if (typeof this.value != type) {
      let err = (errMsg || "should be a " + type);
      throw { id: this.id, err, msg: this.title + " " + err };
    }
    return this;
  }
  min(reqLen, errMsg) {
    if (typeof this.value == "string") {
      if (this.value.length < reqLen) {
        let err = (errMsg || "should be atleast " + reqLen + " chars long");
        throw { id: this.id, err, msg: this.title + " " + err };
      }
      return this;
    } else if (typeof this.value == "number") {
      if (isNaN(this.value) || this.value < reqLen) {
        let err = (errMsg || "should be >= " + reqLen);
        throw { id: this.id, err, msg: this.title + " " + err };
      }
      return this;
    }
    return this;
  }
  max(reqLen, errMsg) {
    if (typeof this.value == "string") {
      if (this.value.length > reqLen) {
        let err = (errMsg || "should be atmost " + reqLen + " chars long");
        throw { id: this.id, err, msg: this.title + " " + err };
      }
      return this;
    } else if (typeof this.value == "number") {
      if (this.value > reqLen) {
        let err = (errMsg || "should be <= " + reqLen);
        throw { id: this.id, err, msg: this.title + " " + err };
      }
      return this;
    }
    return this;
  }
  greaterThan(reqLen, errMsg) {
    if (typeof this.value == "string") {
      if (this.value.length <= reqLen) {
        let err = (errMsg || "should be more than " + reqLen + " chars long");
        throw { id: this.id, err, msg: this.title + " " + err };
      }
      return this;
    } else if (typeof this.value == "number") {
      if (this.value <= reqLen) {
        let err = (errMsg || "should be > " + reqLen);
        throw { id: this.id, err, msg: this.title + " " + err };
      }
      return this;
    }
    return this;
  }
  lessThan(reqLen, errMsg) {
    if (typeof this.value == "string") {
      if (this.value.length >= reqLen) {
        let err = (errMsg || "should be less than " + reqLen + " chars long");
        throw { id: this.id, err, msg: this.title + " " + err };
      }
      return this;
    } else if (typeof this.value == "number") {
      if (this.value <= reqLen) {
        let err = (errMsg || "should be < " + reqLen);
        throw { id: this.id, err, msg: this.title + " " + err };
      }
      return this;
    }
    return this;
  }
  len(reqLen, errMsg) {
    if (typeof this.value == "string") {
      if (this.value.length != reqLen) {
        let err = (errMsg || "must be exactly " + reqLen + " chars long");
        throw { id: this.id, err, msg: this.title + " " + err };
      }
      return this;
    }
    return this;
  }
  equals(val, errMsg) {
    if (this.value != val) {
      let err = '';
      if (typeof this.value == "number") {
        err = (errMsg || "should exactly be " + val);
      }
      else {
        err = (errMsg || "should be " + val);
      }
      throw { id: this.id, err, msg: this.title + " " + err };
    }
    return this;
  }
  email(errMsg) {
    if (typeof this.value == "string") {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(this.value) == false) {
        let err = (errMsg || "must be a vaild email");
        throw { id: this.id, err, msg: this.title + " " + err };
      }
      return this;
    }
    return this;
  }
  contains(char, errMsg) {
    if (typeof this.value == "string") {
      if (!this.value.includes(char)) {
        let err = (errMsg || "must include '" + char + "'");
        throw { id: this.id, err, msg: this.title + " " + err };
      }
      return this;
    }
    return this;
  }
}

class u_class {
  backgroundScroll = $("body").css("overflow");
  static basePages = [];
  recogniseThesePhrases = [];
  recognizingVoice = false;
  recognition = '';

  // Doc Done
  supportingFunctions = {
    isIframe: () => {
      try {
        return window.self !== window.top;
      } catch (e) {
        return true;
      }
    },
    pageChangeActions: (url) => {
      $(".loadingPage").remove();
      $(".loadingPageAtBack").remove();
      window.history.pushState(null, null, url);
    },
    setContainers: () => {
      if ($('.uContainerTopCenter').length == 0) {
        $('body').append("<div id='uContainerTopCenter' class='uContainerTopCenter'></div>");
      }
      if ($('.uContainerTopRight').length == 0) {
        $('body').append("<div id='uContainerTopRight' class='uContainerTopRight'></div>");
      }
      if ($('.uContainerTopLeft').length == 0) {
        $('body').append("<div id='uContainerTopLeft' class='uContainerTopLeft'></div>");
      }
      if ($('.uContainerBottomRight').length == 0) {
        $('body').append("<div id='uContainerBottomRight' class='uContainerBottomRight'></div>");
      }
      if ($('.uContainerBottomLeft').length == 0) {
        $('body').append("<div id='uContainerBottomLeft' class='uContainerBottomLeft'></div>");
      }
    }
  };

  // Doc Done
  toast = {

    showToastMsg: ({ id, icon, title, msg, msgColor = "#212121", direction = "bottomRight", closeAfter, backgroundColor, closeBackgroundColor, closeColor, showClose = true }) => {
      if (!id) {
        id = new Date().getTime();
      }

      this.supportingFunctions.setContainers();

      let html = "";
      html += "<div class='uToast' id='" + id + "'>";
      html += "   <div class='uToastCloseContainer' style='background-color: " + closeBackgroundColor + "'><div  style='background-color: " + closeColor + "; animation: uToastClose " + closeAfter + "s forwards ease' class='uToastClose' ></div></div>";
      html += "   <div class='uToastContainer' style='background-color: " + backgroundColor + "'>";
      html += "     <div class='uToastIcon'>" + icon + "</div>";
      html += "     <div class='uToastTitle'>" + title + "</div>";
      html += "     <div class='uToastMsg' style='color: " + msgColor + "'>" + msg + "</div>";
      html += "     </div>";
      if (showClose) {
        html += "   <div class='close' onclick='closeToast(\"" + id + "\")'><i class='fa fa-times' aria-hidden='true'></i></div>";
      }
      html += "   </div>";
      html += "</div>";

      if (direction == "bottomRight" || (window.innerWidth < 720 && (direction == "bottomRight" || direction == "bottomLeft"))) {
        $(".uContainerBottomRight").append(html);
      }
      else if (direction == "bottomLeft") {
        $(".uContainerBottomLeft").append(html);
      }
      else if (direction == "topRight" || (window.innerWidth < 720 && (direction == "topRight" || direction == "topLeft"))) {
        $(".uContainerTopRight").append(html);
      }
      else {
        $(".uContainerTopLeft").append(html);
      }

      setTimeout(() => {
        $('#' + id).addClass("closeToast");
        setTimeout(() => {
          $('#' + id).remove();
        }, 600)
      }, closeAfter * 1000);
      return id;
    },

    showSuccess: ({
      id,
      icon = "<i class='fa fa-check-circle' aria-hidden='true'></i>",
      title = "Success",
      msg = "Thank you for your visit.",
      msgColor = "#212121",
      direction = "bottomRight",
      closeAfter = 5,
      backgroundColor = "#A5D6A7",
      closeBackgroundColor = "#1B5E20",
      closeColor = "#4CAF50",
      showClose = true,
    }) => {
      return this.toast.showToastMsg({ id, icon, title, msg, msgColor, direction, closeAfter, backgroundColor, closeBackgroundColor, closeColor, showClose });
    },

    showError: ({
      id,
      icon = "<i class='fa fa-times-circle' aria-hidden='true'></i>",
      title = "Error",
      msg = "Illegal operation.",
      msgColor = "#212121",
      direction = "bottomRight",
      closeAfter = 5,
      backgroundColor = "#EF9A9A",
      closeBackgroundColor = "#B71C1C",
      closeColor = "#EF5350",
      showClose = true,
    }) => {
      return this.toast.showToastMsg({ id, icon, title, msg, msgColor, direction, closeAfter, backgroundColor, closeBackgroundColor, closeColor, showClose });
    },

    showWarning: ({
      id,
      icon = "<i class='fa fa-exclamation-triangle' aria-hidden='true'></i>",
      title = "Warning",
      msg = "You forgot important data.",
      msgColor = "#212121",
      direction = "bottomRight",
      closeAfter = 5,
      backgroundColor = "#FFE082",
      closeBackgroundColor = "#FF6F00",
      closeColor = "#FFB300",
      showClose = true,
    }) => {
      return this.toast.showToastMsg({ id, icon, title, msg, msgColor, direction, closeAfter, backgroundColor, closeBackgroundColor, closeColor, showClose });
    },

    showInfo: ({
      id,
      icon = "<i class='fa fa-info-circle' aria-hidden='true'></i>",
      title = "Info",
      msg = "Hello.",
      msgColor = "#212121",
      direction = "bottomRight",
      closeAfter = 5,
      backgroundColor = "#90CAF9",
      closeBackgroundColor = "#1565C0",
      closeColor = "#42A5F5",
      showClose = true,
    }) => {
      return this.toast.showToastMsg({ id, icon, title, msg, msgColor, direction, closeAfter, backgroundColor, closeBackgroundColor, closeColor, showClose });
    },
  };

  // Doc Done
  alert = {
    closeCenterBodyContent: (id, closeAfter, backgroundScroll) => {
      setTimeout(() => {
        $("#" + id).fadeOut(400);
        setTimeout(() => {
          $("#" + id).remove();
          $("body").css("overflow", backgroundScroll);
        }, 450);
      }, closeAfter * 1000);
    },

    centerBodyContent: ({
      id = "uModal",
      title = "TITLE",
      msg = "MSG",
      direction = "center",
      backgroundColor = "#59B189",
      customButton = {},
      autoClose = false,
      closeAfter = -1,
      showAnimation = true,
      animationUrl = "https://assets7.lottiefiles.com/datafiles/67bae0ddb57b26679d10e9ce7c1d445f/data.json",
      animationSpeed = 1,
      animationLoop = false,
      closeOnBackgroundClick = true,
      titleColor = "#424242",
      msgColor = "rgba(66, 66, 66, 0.8)",
      buttonTxt = "Close",
      showButton = true,
    }) => {
      try {
        if ($("body").css("overflow") != "hidden") {
          this.backgroundScroll = $("body").css("overflow");
        }
        let html = "";
        html += '<div class="uModal uModal_' + direction + '" id="' + id;
        if (!autoClose && closeOnBackgroundClick) {
          html += '" onclick="closeCenterBodyContentOnBackgroundClick(\'' + id + '\', \'' + this.backgroundScroll + '\')">';
        } else {
          html += '" >';
        }

        html += '    <div class="uModal_Container" style="border-color:' + backgroundColor + '">';
        if (id == "loaderModal") {
          html += '       <div class="decorator">';
        }
        else {
          html += '       <div class="decorator" style="background-color:' + backgroundColor + '">';
        }
        if (showAnimation && this.functions.isDeviceOnline()) {
          html += '        <lottie-player src="' + animationUrl + '" background="transparent" speed="' + animationSpeed + '" autoplay ';
          if (animationLoop) {
            html += " loop";
          }
          html += "></lottie-player>";
        }
        html += "       </div>";
        html += "       <div class='uModal_Container__contentHolder'>";
        if (title && title.length > 0) {
          html +=
            '         <div class="uModal_Container__Text"  style="color:' +
            titleColor +
            '">' +
            title +
            "</div>";
        }
        if (msg && msg.length > 0) {
          html +=
            '         <div class="uModal_Container__Msg" style="color:' +
            msgColor +
            '">' +
            msg +
            "</div>";
        }
        html += "       </div>";
        if (showButton) {
          html += "   <div class='uModal_Container__displayFlex'>";
          if ("buttonText" in customButton) {
            html += "     <div class='uModal_Container__closeButtonContainer' onclick='closeCenterBodyContent(\"" + id + "\", \"" + this.backgroundScroll + "\");' style='border-color:" + backgroundColor + "; color:" + backgroundColor + "'> " + buttonTxt + "     </div>";
            html += "     <div class='uModal_Container__closeButtonContainer' onclick='" + customButton.onClick[0] + "(\"" + customButton.onClick[1] + "\")' style='background-color:" + backgroundColor + "'> " + customButton.buttonText + "     </div>";
          }
          else {
            html += "     <div class='uModal_Container__closeButtonContainer' onclick='closeCenterBodyContent(\"" + id + "\", \"" + this.backgroundScroll + "\");' style='background-color:" + backgroundColor + "'> " + buttonTxt + "     </div>";
          }
          html += "   </div>";
        }
        html += "    </div>";
        html += "</div>";

        $("body").append(html).css("overflow", "hidden");
        //$("*").blur();
        $("uModal_Container__closeButtonContainer").focus();
        if (autoClose && closeAfter != -1) {
          this.alert.closeCenterBodyContent(id, closeAfter, this.backgroundScroll);
        }
      } catch (err) {
        console.log(err.message);
      }
    },

    showSuccess: ({
      id = "successMsg",
      title = "SUCCESS",
      msg = "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
      direction = "center",
      customButton = {},
      autoClose = false,
      closeAfter = 1.5,
      closeOnBackgroundClick = true,
      backgroundColor = "#66BB6A",
      buttonTxt = "Close",
      showButton = true,
      showAnimation = true,
      animationUrl = "./lottie/success.json",
    }) => {
      this.alert.centerBodyContent({
        id,
        title,
        msg,
        direction,
        customButton,
        autoClose,
        closeAfter,
        animationUrl,
        animationSpeed: 1,
        backgroundColor,
        buttonTxt,
        closeOnBackgroundClick,
        titleColor: backgroundColor,
        showButton,
        showAnimation,
      });
    },

    showError: ({
      id = "errorMsg",
      title = "ERROR",
      msg = "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
      direction = "center",
      customButton = {},
      autoClose = false,
      closeAfter = 1.5,
      closeOnBackgroundClick = true,
      backgroundColor = "#EF5350",
      buttonTxt = "Close",
      showButton = true,
      showAnimation = true,
      animationUrl = "./lottie/error.json",
    }) => {
      this.alert.centerBodyContent({
        id,
        title,
        msg,
        direction,
        customButton,
        autoClose,
        closeAfter,
        animationUrl,
        animationSpeed: 1,
        backgroundColor,
        buttonTxt,
        closeOnBackgroundClick,
        titleColor: backgroundColor,
        showButton,
        showAnimation,
      });
    },

    showHint: ({
      id = "hintMsg",
      title = "HINT",
      msg = "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
      direction = "center",
      customButton = {},
      autoClose = false,
      backgroundColor = "#FFCA28",
      buttonTxt = "Close",
      closeAfter = 1.5,
      closeOnBackgroundClick = true,
      showButton = true,
      showAnimation = true,
      animationUrl = "./lottie/hint.json",
    }) => {
      this.alert.centerBodyContent({
        id,
        title,
        msg,
        direction,
        customButton,
        autoClose,
        closeAfter,
        animationUrl,
        animationSpeed: 1,
        backgroundColor,
        buttonTxt,
        closeOnBackgroundClick,
        titleColor: backgroundColor,
        showButton,
        showAnimation,
      });
    },

    showLoader: ({ msg = "Please be patient, we are fetching data..", direction = "center", backgroundColor = "#FFCA28", animationUrl = "./lottie/loader.json" }) => {
      if ($(".uModal")[0]) {
        $(".uModal_Container__Msg").html(msg);
        return;
      }

      this.alert.centerBodyContent({
        id: "loaderModal",
        title: "",
        msg,
        direction,
        backgroundColor,
        autoClose: false,
        closeAfter: -1,
        animationUrl,
        animationSpeed: 1,
        animationLoop: true,
        msgColor: "#424242d0",
        showButton: false,
        closeOnBackgroundClick: false,
      });
    },

    hideLoader: () => {
      $("#loaderModal").fadeOut(800);
      let backgroundScroll = this.backgroundScroll;
      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          $("body").css("overflow", backgroundScroll);
          $("#loaderModal").remove();
          resolve();
        }, 850);
      });
    },
  };

  // Doc Done
  modal = {
    openModal: ({
      id = "uModal",
      header = "",
      body = '',
      footer = '',
      height = "15vh",
      width = "80vw",
      direction = "center",
      openDirection = "",

      onClose = null,

      borderRadius = "3px",
      closeOnBackgroundClick = true,
      showCloseButton = true,
      closeButtonBackgroundColor = "#FFF",
      closeButtonColor = "#636363",
      bodyBackgroundColor = "#FFFFFF",
      headerHeight = "7vh",
      headerBackgroundColor = "#E0E0E0",
      headerColor = "#212121",
      headerFontSize = "22px",
      headerTextAlign = "left",
      footerBackgroundColor = "#E0E0E0",
      footerHeight = "8vh",
      footerTextAlign = "left",

      isGrouped = false,
      showGroupSteps = true,
      changeModalOnClick = true,
      memberCount = 0,
      memberIndex = 0,
      groupName = "uGroupedModal",
    }) => {
      if ($("body").css("overflow") != "hidden") {
        this.backgroundScroll = $("body").css("overflow");
      }

      let containerStyle = "";
      containerStyle += `height: ${height}; `;
      containerStyle += `width: ${width}; `;
      containerStyle += `border-radius: ${borderRadius}; `;

      let headerMargintTop = "0";
      if (!header || !header.length) {
        headerHeight = "0vh";
      }

      let bodyHeight = `calc(${height} - ${headerHeight})`;
      if (footer && footer.length) {
        bodyHeight = `calc(${height} - ${headerHeight} - ${footerHeight})`;
      }

      let alignItems = "center";
      let justifyContent = "center";

      if (direction == "left") {
        justifyContent = "flex-start";
      } else if (direction == "right") {
        justifyContent = "flex-end";
      }

      let uMainModalClass = "";
      if (openDirection == "rtl") {
        uMainModalClass = "rtl";
      } else if (openDirection == "ltr") {
        uMainModalClass = "ltr";
      }

      let groupClass = "";
      if (isGrouped) {
        groupClass = groupName;
      }

      let html = '';
      let modalGroupedClass = '';
      if (!isGrouped || (isGrouped && memberIndex == 0)) {
        html += `<div class="uMainModalBackground">`;
      }
      if (isGrouped) {
        modalGroupedClass = "modalGrouped";
      }
      html += ` <div id="${id}" class="uMainModalContainer${memberIndex} ${modalGroupedClass} group-${groupClass}" data-group="group-${groupClass}" style="align-items: ${alignItems}; justify-content: ${justifyContent}"`;
      if (closeOnBackgroundClick) {
        html += ` onclick="closeMainModalOnBackgroundClick('${id}', '${this.backgroundScroll}', ${onClose} )"`;
      }

      html += ` >
                  <div class="uMainModal${uMainModalClass}" style="${containerStyle}">`;

      if (showCloseButton) {
        html += `     <div class="uMainModal_closeButton" style="background-color: ${closeButtonBackgroundColor}; color: ${closeButtonColor}" onclick="closeMainModal('${id}', '${this.backgroundScroll}', ${onClose})" title="Close"><i class="fa fa-times" aria-hidden="true" style="pointer-events: none;"></i></div>`;
      }

      if (isGrouped && showGroupSteps) {
        html += `<div class='groupMemberButtons'>`;
        for (let i = 0; i < memberCount; i++) {
          if (changeModalOnClick) {
            html += `<span class='groupMemberButton hoverableMemberButton' onclick="openGroupedModal(${i})"></span>`;
          }
          else {
            html += `<span class='groupMemberButton'></span>`;
          }
        }
        html += `</div>`;

        headerMargintTop = '5px';
      }

      if (header && header.length) {
        html += `     <div class="uMainModal_Title" style="text-align: ${headerTextAlign}; font-size: ${headerFontSize}; color: ${headerColor}; background-color: ${headerBackgroundColor};">
                        <div style="margin-top: ${headerMargintTop};">${header}</div>
                      </div>`;
      }
      if (body && body.length) {
        html += `     <div class="uMainModal_Body" style="height: ${bodyHeight}; background-color: ${bodyBackgroundColor}; border-bottom: ${footer && footer.length ? 0 : 4}px solid ${headerBackgroundColor}; border-top: ${header && header.length ? 0 : 4}px solid ${footerBackgroundColor}">
                        ${body}
                      </div>`;
      }
      if (footer && footer.length) {
        html += `   <div class="uMainModal_Footer" style="background-color: ${footerBackgroundColor}; height: ${footerHeight}; text-align: ${footerTextAlign}">
                      ${footer}
                    </div>`;
      }
      html += `   </div>
               </div>`;
      if (!isGrouped || (isGrouped && memberIndex == 0)) {
        html += `</div>`;
      }

      if (!isGrouped || (isGrouped && memberIndex == 0)) {
        $("body").append(html).css("overflow", "hidden");
      } else {
        $(".uMainModalBackground").append(html);
      }
      $(`.groupMemberButton:nth-child(${memberCount + 1})`).addClass("uMainModalCurrentMemeber");

      $(`.uMainModalContainer0`).addClass("uMainModalContainer");
      $(`.groupMemberButton:nth-child(1)`).addClass(`uMainModalCurrentMemeber`);
      $(`.uMainModalBackground`).data("currentPage", "0");
    },

    openGroupedModal: (index) => {
      if ($(`.uMainModalContainer${index}`).hasClass("uMainModalContainer")) {
        return;
      }

      let currentPage = $(`.uMainModalBackground`).data("currentPage");
      if (index > currentPage) {
        $(`.uMainModalContainer`).addClass("uSlideMainModalLeft").removeClass("uBringMainModalFromLeft").removeClass("uBringMainModalFromRight");

        setTimeout(() => {
          $(`.uMainModalContainer`).removeClass(`uMainModalContainer`).removeClass(`uSlideMainModalLeft`).removeClass(`uBringMainModalFromLeft`);
          $(`.uMainModalContainer${index}`).addClass("uMainModalContainer").addClass("uBringMainModalFromLeft");

          $(`.groupMemberButton`).removeClass("uMainModalCurrentMemeber");
          $(`.groupMemberButton:nth-child(${index + 1})`).addClass("uMainModalCurrentMemeber");
        }, 100);
        $(`.uMainModalBackground`).data("currentPage", index);
      } else {
        $(`.uMainModalContainer`).addClass("uSlideMainModalRight").removeClass("uBringMainModalFromRight").removeClass("uBringMainModalFromLeft");

        setTimeout(() => {
          $(`.uMainModalContainer`).removeClass(`uMainModalContainer`).removeClass(`uSlideMainModalRight`).removeClass(`uBringMainModalFromRight`);
          $(`.uMainModalContainer${index}`).addClass("uMainModalContainer").addClass("uBringMainModalFromRight");

          $(`.groupMemberButton`).removeClass("uMainModalCurrentMemeber");
          $(`.groupMemberButton:nth-child(${index + 1})`).addClass("uMainModalCurrentMemeber");
        }, 100);
        $(`.uMainModalBackground`).data("currentPage", index);
      }
    },
  };

  // Doc Done
  notification = {
    type1: ({ id, icon = "U", heading, content, closeAfter = 5, color = "#17A2B8", direction = "right", showCloseButton = true }) => {
      if (!id) {
        id = new Date().getTime();
      }
      this.supportingFunctions.setContainers();

      let html = "";
      let marginLeft = "2%";
      html += '<div class="uNotification uNotification_' + direction + '" id="' + id + '"  style="border-color: ' + color + '">';
      if (showCloseButton) {
        html += "   <div class='close' onclick='closeToast(\"" + id + "\")'><i class='fa fa-times' aria-hidden='true' style='color: " + color + "'></i></div>";
      }
      if (icon) {
        marginLeft = "18%";
        html += '   <div class="icon" style="background-color:' + color + '">' + icon + '</div>';
      }
      html += '   <div class="desc" style="margin-left: ' + marginLeft + '">';
      if (heading) {
        html += '     <div class="heading" style="color:' + color + '">' + heading + '     </div>';
      }
      if (content) {
        html += '     <div>' + content + '     </div>';
      }
      html += '   </div>';
      html += '</div>';

      if (direction == "center" || window.innerWidth < 720) {
        $(".uContainerTopCenter").append(html);
      }
      else if (direction == "left") {
        $(".uContainerTopLeft").append(html);
      }
      else {
        $(".uContainerTopRight").append(html);
      }

      setTimeout(() => {
        $('#' + id).addClass("closeToast");
        setTimeout(() => {
          $('#' + id).remove();
        }, 600)
      }, closeAfter * 1000)
      return id;
    }
  };

  // Doc Done
  notice = {
    closeCenterBodyContent: (id, closeAfter, backgroundScroll) => {
      setTimeout(() => {
        $("#" + id).fadeOut(400);
        setTimeout(() => {
          $("#" + id).remove();
          $("body").css("overflow", backgroundScroll);
        }, 450);
      }, closeAfter * 1000);
    },

    showNotice: ({
      id = "uNotice",
      animationSpeed = 1,
      animationLoop = false,
      closeOnBackgroundClick = true,
      msgColor = "rgba(66, 66, 66, 0.8)",
      onClose = null,

      content = [],

      msgArr = [],
      title = "Notice",
      animationUrl = "",
      backgroundColor,
      titleColor,
    }) => {
      if (!content.length && msgArr.length) {
        let i, j;
        for (i = 0; j = msgArr.length, i < j; i++) {
          let data = [];
          data["msg"] = msgArr[i];
          if (title) {
            data["title"] = title;
          }
          if (animationUrl) {
            data["animationUrl"] = animationUrl;
          }
          if (backgroundColor) {
            data["backgroundColor"] = backgroundColor;
          }
          if (titleColor) {
            data["titleColor"] = titleColor;
          }
          content.push({ ...data });
        }
      }

      try {
        if ($("body").css("overflow") != "hidden") {
          this.backgroundScroll = $("body").css("overflow");
        }
        let html = "";
        html += '<div class="uModal uNotice uModal_center" id="' + id;
        if (closeOnBackgroundClick) {
          html += `" onclick="closeCenterBodyContentOnBackgroundClick('${id}', '${this.backgroundScroll}', ${onClose})">`;
        } else {
          html += '" >';
        }

        let { title, msg, backgroundColor, titleColor, animationUrl } = content[0];
        [title, msg, backgroundColor, titleColor, animationUrl] = setDefaults(title, msg, backgroundColor, titleColor, animationUrl);

        html += '    <div class="uModal_Container" style="border-color:' + backgroundColor + '">';

        if (id == "loaderModal") {
          html += '       <div class="decorator">';
        }
        else {
          html += '       <div class="decorator" style="background-color:' + backgroundColor + '; height: 60px; justify-content: flex-start">';
        }
        if (animationUrl && animationUrl.length && this.functions.isDeviceOnline()) {
          html += '        <lottie-player src="' + animationUrl + '" background="transparent" speed="' + animationSpeed + '" autoplay style="height: 40px;max-width: 60px;padding: 0 !important;"';
          if (animationLoop) {
            html += " loop";
          }
          html += "></lottie-player>";
        }
        if (title && title.length > 0) {
          html +=
            '         <div class="uModal_Container__Text"  style="color:' + titleColor + '; margin: 0; padding: 0; text-align: left;">' +
            title +
            "</div>";
        }
        html += "       </div>";
        html += "       <div class='uModal_Container__contentHolder' style='position: relative;'>";

        if (content.length > 1) {
          html += `<div class='groupMemberButtons' style="top: 8px;">`;
          for (let i = 0; i < content.length; i++) {
            html += `<span class='groupMemberButton hoverableMemberButton' onclick="changeNotice(${i})"></span>`;
          }
          html += `</div>`;
        }

        if (msg && msg.length > 0) {
          html += `         <div class="uModal_Container__Msg" style="color:${msgColor}; margin-top:35px;max-height: 50vh;max-width: 80vw; overflow: auto;">${msg}</div>`;
        }
        html += "       </div>";
        html += "   <div class='uModal_Container__displayFlex mt-3'>";
        if (content.length > 1) {
          html += `     <div class='uModal_Container__closeButtonContainer prevNotice' onclick="prevNotice()" style='border-color:${backgroundColor}; color:${backgroundColor}; font-weight: bold; letter-spacing: 0.1em;'>Prev</div>`;
          html += `     <div class='uModal_Container__closeButtonContainer nextNotice' onclick="nextNotice()" style='background-color:${backgroundColor}; color:white; font-weight: bold; letter-spacing: 0.1em;'>Next</div>`;
        }
        html += `     <div class='uModal_Container__closeButtonContainer closeNotice' style='background-color:${backgroundColor}; color:white; font-weight: bold; letter-spacing: 0.1em;' onclick="closeCenterBodyContentOnBackgroundClick('${id}', '${this.backgroundScroll}')">Close</div>`;
        html += "    </div>";
        html += "</div>";

        $("body").append(html).css("overflow", "hidden");
        $(".prevNotice").css("display", "none");
        if (content.length > 1) {
          $(`.closeNotice`).css("display", "none");
        }
        $("uModal_Container__closeButtonContainer").focus();
        $(".uModal").data("content", content);
        $(".uModal").data("currentMem", 0);
        $(`.groupMemberButton:nth-child(1)`).addClass(`uMainModalCurrentMemeber`);
      } catch (err) {
        console.log(err.message);
      }
    },

    changeNotice: (mem) => {
      currentMem = $(".uModal").data("currentMem");
      if (mem == currentMem) {
        return;
      }
      newContent = $(".uModal").data("content")[mem];
      curContent = $(".uModal").data("content")[currentMem];

      [title, msg, backgroundColor, titleColor, animationUrl] = setDefaults(newContent.title, newContent.msg, newContent.backgroundColor, newContent.titleColor, newContent.animationUrl);

      if (msg != curContent.msg) {
        $(".uNotice .uModal_Container__Msg").fadeTo("fast", "0", () => {
          $(".uNotice .uModal_Container__Msg").html(msg).fadeTo("fast", "1", () => { });
        });
      }

      let html = '        <lottie-player src="' + animationUrl + '" background="transparent" speed="1" autoplay style="height: 40px;max-width: 60px;padding: 0 !important;"></lottie-player>';
      if (title && title.length > 0) {
        html += '         <div class="uModal_Container__Text"  style="color:' + titleColor + ';  margin: 0; padding: 0; text-align: left;">' + title + "</div>";
      }
      $(".uNotice .decorator").html(html);

      $(".uNotice .decorator").css("backgroundColor", backgroundColor);
      $(".uNotice .uModal_Container").css("border-color", backgroundColor);

      $(".uModal").data("currentMem", mem);
      $(`.groupMemberButton`).removeClass(`uMainModalCurrentMemeber`);
      $(`.groupMemberButton:nth-child(${mem + 1})`).addClass(`uMainModalCurrentMemeber`);
    }
  };

  // Doc Done
  constants = {
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    months_short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    days_short: ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"],
    days_single: ["S", "M", "T", "W", "T", "F", "S"],
  };

  // Doc Done
  drawers = {
    // Doc Done
    bottomDrawer: ({ heading = null, body = null, id = 'uBottomDrawer', closeOnBackgroundClick = true, borderRadius = 0, borderColor = "transparent" }) => {
      if ($("body").css("overflow") != "hidden") {
        this.backgroundScroll = $("body").css("overflow");
      }
      let html = "";
      html += "<div class='uDrawer' id='" + id + "' ";
      if (closeOnBackgroundClick) {
        html += ' onclick="closeDrawerOnBackgroundClick(\'' + id + '\', \'' + this.backgroundScroll + '\')">';
      } else {
        html += '" >';
      }
      html += "   <div class='uDrawer_container open_uDrawer_container' style='border-top-left-radius:" + borderRadius + "; border-top-right-radius:" + borderRadius + "; border-top: 4px solid " + borderColor + ";' >";
      if (heading) {
        html += "   <div class='uDrawer_container__heading'>";
        html += "     <div>" + heading + "</div>";
        html += "     <div class='uDrawer_container__close' onclick='closeDrawer(\"" + id + "\", \"" + this.backgroundScroll + "\")'>x</div>";
        html += "   </div>";
      }
      else {
        html += "   <div class='uDrawer_container__heading' style='border:0; height: 1vh;'>";
        html += "     <div class='uDrawer_container__closeWithoutHeader' onclick='closeDrawer(\"" + id + "\", \"" + this.backgroundScroll + "\")'>x</div>";
        html += "   </div>";
      }
      if (body) {
        html += "   <div class='uDrawer_container__body'>" + body;
        html += "   </div>";
      }
      html += "   </div>";
      html += "</div>";
      //$("*").blur();
      $("body").append(html).css("overflow", "hidden");
    },

    // Doc Done
    navDrawer: ({ beforeMenu, completeMenu, afterMenu, direction = 'left', id = 'uNavDrawer', closeOnBackgroundClick = true, logo = null, decoratorColor = '#d92319e0', hideLogo = false }) => {
      let navClass = "";
      if (direction == 'left' && $(".uLeftDrawer").length > 0) {
        navClass = "uLeftDrawer";
        this.functions.openNavDrawer(navClass);
        return;
      }
      else if (direction == 'right' && $(".uRightDrawer").length > 0) {
        navClass = "uRightDrawer";
        this.functions.openNavDrawer(navClass);
        return;
      }

      if (direction == "left") {
        $("body").data('completeLeftMenu', completeMenu);
      }
      else {
        $("body").data('completeRightMenu', completeMenu);
      }

      if ($("body").css("overflow") != "hidden") {
        this.backgroundScroll = $("body").css("overflow");
      }
      let html = "";
      if (direction == 'left') {
        html += "<div id='" + id + "' class='uLeftDrawer openLeftDrawer' ";
      }
      else {
        html += "<div id='" + id + "' class='uRightDrawer openRightDrawer' ";
      }

      if (closeOnBackgroundClick) {
        if (direction == 'left') {
          html += "onclick='closeNavDrawer(\"uLeftDrawer\")'>";
        }
        else {
          html += "onclick='closeNavDrawer(\"uRightDrawer\")'>";
        }
      }
      else {
        html += " >";
      }

      html += "   <div class='uNavDrawer_container'>";
      html += "     <div class='uNavDrawer_containerDecorator' style='background-color: " + decoratorColor + "'></div>";

      if (!hideLogo && logo && logo.length > 0) {
        html += "     <img src='" + logo + "' alt='APP ICON'>";
      }

      if (beforeMenu && beforeMenu.length > 0) {
        html += beforeMenu;
      }

      html += "   <div id='menuContainer'>";
      html += "     <div class='menuTitle'></div>";
      html += "     <div class='menuContents'></div>";
      html += "   </div>";

      if (afterMenu && afterMenu.length > 0) {
        html += afterMenu;
      }

      html += "   </div>";
      html += "</div>";
      $("body").append(html);
      //$("*").blur();
      fillUpMenu("menu", direction);
    }
  };

  pageLoad = {
    loadPageRight: async (url) => {
      this.supportingFunctions.pageChangeActions(url);
      var html = "";
      html +=
        "<iframe src='" +
        url +
        "' class='loadingPage' onload='transitionPage(\"right\")' />";
      $("body").append(html);
    },
    loadPageUp: async (url) => {
      this.supportingFunctions.pageChangeActions(url);
      var html = "";
      html +=
        "<iframe src='" +
        url +
        "' class='loadingPageTop' onload='transitionPage(\"up\")' />";
      $("body").append(html);
    },
  };

  // Doc Done
  functions = {
    // Doc Done
    correctDate: ({ date = new Date() }) => {
      date = new Date(date.toString().replace(/ /g, 'T'));
      return this.functions.setNumericPrecision(date.getDate(), 2) + '-' + this.functions.setNumericPrecision(date.getMonth() + 1, 2) + '-' + this.functions.setNumericPrecision(date.getFullYear(), 4);
    },
    // Doc Done
    correctDateAlpha: ({ date = new Date(), shortMonth = false }) => {
      if (typeof date == "string") {
      } else {
        date = date.toDateString();
      }
      date = new Date(date.replace(/-/g, '/'));
      let ret = this.functions.setNumericPrecision(date.getDate(), 2);
      if (shortMonth) {
        ret += ' ' + this.constants.months_short[date.getMonth()];
      }
      else {
        ret += ' ' + this.constants.months[date.getMonth()];
      }
      ret += ' ' + date.getFullYear();
      return ret;
    },
    // Doc Done
    deviceConnection: () => {
      return { downlink: window.navigator.connection.downlink, effectiveType: window.navigator.connection.effectiveType };
      // Doc Done
    },
    // Doc Done
    indianNumberFormat: ({ number = 0, currency = "" }) => {
      return number.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        style: currency ? 'currency' : "decimal",
        currency: currency ? currency : undefined
      });
    },
    // Doc Done
    internationalNumberFormat: ({ number = 0, currency = "" }) => {
      return number.toLocaleString('en-US', {
        maximumFractionDigits: 2,
        style: currency ? 'currency' : "decimal",
        currency: currency ? currency : undefined
      });
    },
    // Doc Done
    isDeviceOnline: () => {
      return window.navigator.onLine;
    },
    // Doc Done
    lockInDevTools: () => {
      setTimeout(() => { debugger }, 1000);
    },
    // Doc Done
    openNavDrawer: (navClass) => {
      if (navClass == "uLeftDrawer") {
        fillUpMenu("menu", "left");
        $("." + navClass).removeClass("closedLeftDrawer").css("transform", "translateX(-100vw)").addClass("openLeftDrawer");
      }
      else {
        fillUpMenu("menu", "right");
        $("." + navClass).removeClass("closedRightDrawer").css("transform", "translateX(100vw)").addClass("openRightDrawer");
      }
    },
    // Doc Done
    setNumericPrecision: (data, precision) => {
      data = '' + data;

      data = data.split(".");
      let decimal = data[1];
      data = data[0];

      while (data.length < precision) {
        data = '0' + data;
      }
      if (decimal) {
        return data + "." + decimal;
      }
      else {
        return data;
      }
    },
    // Doc Done
    sleep: (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    // Doc Done
    tabs: {
      init: ({ headerDirection = "topLeft", tabContentHeight = -1, defaultTabBackgroundColor = "#F1F1F1", defaultContentBackgroundColor = "#F1F1F1", defaultTabColor = "#212529", selectedTabBackgroundColor = "#2196F3", selectedTabColor = "white", onActivate = null }) => {
        if (window.innerWidth < 600) {
          $(".uTabsHeader").css("flex-direction", "column").css("height", $($(".uTabsHeader div")[0]).innerHeight() + "px").css("overflow", "scroll").css("width", "100%");
          $(".uTabsHeader div").css("min-width", $(".uTabsHeader").innerWidth() + "px");
          $(".uTabsHeader div").append(`<div class='uTabsToggleHeaderHeight'><i class="fa fa-caret-down" aria-hidden="true"></i></div>`);

          $(".uTabsToggleHeaderHeight").click((e) => {
            if ($(".uTabsHeader i").hasClass("fa-caret-down")) {
              // Needs To be opened
              this.functions.tabs.openTabMenu();
            } else {
              // Needs To be closed
              this.functions.tabs.closeTabMenu();
            }
          });
        }
        this.functions.tabs.initClickEvents();
        if (headerDirection == "topCenter") {
          $(".uTabsHeader").css("align-self", "center");
        } else if (headerDirection == "topRight") {
          $(".uTabsHeader").css("align-self", "flex-end");
        } else if (headerDirection == "bottomLeft") {
          $(".uTabsContainer").css("flex-direction", "column-reverse");
        } else if (headerDirection == "bottomCenter") {
          $(".uTabsContainer").css("flex-direction", "column-reverse");
          $(".uTabsHeader").css("align-self", "center");
        } else if (headerDirection == "bottomRight") {
          $(".uTabsContainer").css("flex-direction", "column-reverse");
          $(".uTabsHeader").css("align-self", "flex-end");
        }

        if (tabContentHeight != -1) {
          $(".uTabs li").css("height", tabContentHeight);
        }

        $(".uTabsHeader").data("defaultTabBackgroundColor", defaultTabBackgroundColor);
        $(".uTabsHeader").data("defaultTabColor", defaultTabColor);
        $(".uTabsHeader").data("selectedTabBackgroundColor", selectedTabBackgroundColor);
        $(".uTabsHeader").data("selectedTabColor", selectedTabColor);
        $(".uTabsHeader").data("onActivate", onActivate);

        $(".uTabs").css("background-color", defaultContentBackgroundColor);
        $(".uTabsHeader > div").css("background-color", defaultTabBackgroundColor).css("color", defaultTabColor);;

        this.functions.tabs.changeTabToPage(1);
        if (onActivate) {
          onActivate(1);
        }
      },
      initClickEvents: () => {
        $(".uTabsHeader div").click((e) => {
          if (
            $(e.target).hasClass("uTabsToggleHeaderHeight") ||
            ($($($(e.target)[0])[0]).hasClass("fa-caret-up") || $($($(e.target)[0])[0]).hasClass("fa-caret-down"))
          ) {
            return;
          }
          if ($($($(e.target).parent())[0]).hasClass("selectedTab") || $($($($(e.target).parent()[0]).parent()[0])).hasClass("selectedTab")) {
            this.functions.tabs.closeTabMenu(false);
            return;
          }
          $(".uTabsHeader *").css("pointer-events", "none");
          let div = $($(e.target)[0])[0];
          if (div.tagName == "LABEL") {
            div = $(div).parent()[0];
          } else if (div.tagName == "I") {
            div = $($(div).parent()[0]).parent()[0];
          }

          let page = $(div).data("page");
          this.functions.tabs.changeTabToPage(page);

          let onActivate = $(".uTabsHeader").data("onActivate");
          if (onActivate) {
            onActivate(page);
          }

          $(".uTabsHeader *").css("pointer-events", "all");
        });
      },
      changeTabToPage: (page) => {
        $(".uTabs li").each((index, item) => {
          if ($(item).data("page") == page) {
            $(".uTabs li").fadeOut(400);
            setTimeout(() => {
              $(".uTabs li").css("display", "none");
              $(item).fadeIn(400);
            }, 400);
          }
        });
        $(".uTabsHeader div").each((index, item) => {
          if ($(item).data("page") == page) {
            let defaultTabBackgroundColor = $(".uTabsHeader").data("defaultTabBackgroundColor");
            let defaultTabColor = $(".uTabsHeader").data("defaultTabColor");
            $(".uTabsHeader .selectedTab label").css("background-color", defaultTabBackgroundColor).css("color", defaultTabColor);
            $(".uTabsHeader .selectedTab").removeClass("selectedTab");
            $(item).addClass("selectedTab");

            let selectedTabBackgroundColor = $(".uTabsHeader").data("selectedTabBackgroundColor");
            let selectedTabColor = $(".uTabsHeader").data("selectedTabColor");
            $(".selectedTab label").css("background-color", selectedTabBackgroundColor).css("color", selectedTabColor);
          }
        });

        if ($(".uTabsToggleHeaderHeight").length > 0) {
          this.functions.tabs.closeTabMenu();
          let position = $(".selectedTab").position().top;
          $(".uTabsHeader").scrollTop(position);
        }
      },
      openTabMenu: () => {
        $(".uTabsContainer").css("padding-top", $(".uTabsHeader").innerHeight() + 5 + "px");
        $(".uTabsHeader").css("position", "absolute").css("top", "0").css("box-shadow", "rgb(130, 130, 130) 0px 2px 6px 0px");
        $(".uTabsHeader").css("height", "auto");
        $(".uTabsHeader .uTabsToggleHeaderHeight i").removeClass("fa-caret-down").addClass("fa-caret-up");
      },
      closeTabMenu: (openTabMenu = true) => {
        $(".uTabsContainer").css("padding-top", "0px");
        $(".uTabsHeader").css("position", "relative").css("box-shadow", "rgb(130, 130, 130) 0px 0px 0px 0px");
        $(".uTabsHeader").css("height", $($(".uTabsHeader div")[0]).innerHeight() + "px");
        $(".uTabsHeader .uTabsToggleHeaderHeight i").removeClass("fa-caret-up").addClass("fa-caret-down");

        if (openTabMenu) {
          $(".uTabsHeader div").off("click");
          this.functions.tabs.initClickEvents();
          $(".uTabsHeader .selectedTab").click(() => {
            this.functions.tabs.openTabMenu();
          });
        }
      },
    },
    // Doc Done
    voiceRecognition: {
      init: () => {
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
        var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

        var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + this.recogniseThesePhrases.join(' | ') + ' ;';

        var speechRecognitionList = new SpeechGrammarList();
        speechRecognitionList.addFromString(grammar, 1);

        this.recognition = new SpeechRecognition();
        this.recognition.grammars = speechRecognitionList;
        this.recognition.continuous = false;
        this.recognition.lang = 'en-US';
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;

        this.recognition.onresult = event => {
          let customEvent = new CustomEvent(
            "voiceRecognition",
            {
              detail: {
                result: true,
                type: "result",
                transcript: event.results[0][0].transcript,
                confidence: event.results[0][0].confidence
              },
              bubbles: true,
              cancelable: true
            }
          );
          document.body.dispatchEvent(customEvent);
        }

        this.recognition.onspeechend = () => {
          this.recognition.stop();
        }

        this.recognition.onnomatch = event => {
          let customEvent = new CustomEvent(
            "voiceRecognition",
            {
              detail: {
                result: false,
                type: "no match",
                transcript: "Could not recognize that",
              },
              bubbles: true,
              cancelable: true
            }
          );
          document.body.dispatchEvent(customEvent);
        }

        this.recognition.onerror = event => {
          let customEvent = new CustomEvent(
            "voiceRecognition",
            {
              detail: {
                result: false,
                type: "error",
                transcript: "Error occured in recognition",
              },
              bubbles: true,
              cancelable: true
            }
          );
          document.body.dispatchEvent(customEvent);
        }
      },

      startRecognition: () => {
        if (this.recognizingVoice) {
          this.functions.voiceRecognition.stopRecognition();
          this.recognizingVoice = false;
          return;
        }
        this.recognizingVoice = true;
        this.recognition.start();
      },

      stopRecognition: () => {
        this.recognition.stop();
      },
    },
  };
}

window.onload = (e) => {
  $('body').data("pageLoad", []);

  // let u = new u_class();
  // if (!u.functions.isDeviceOnline()) {
  //   u.toast.showError({ id: "networkConnection", msg: "No Internet Connection" });
  // }

}

window.onpopstate = history.onpushstate = function (e) {
  gotoLocation = e.target.location.href;
  callBackPageEvent();
  if ($(".prevPage").length > 0) {
    // Previous page exists
    directions = $("body").data("pageLoad");
    x = directions.pop();
    $("body").data("pageLoad", directions);
    if (x == "right") {
      $(".activePage").addClass("transitionPageRight");
    } else if (x == "up") {
      $(".activePage").addClass("transitionPageDown");
    }

    setTimeout(() => {
      $(".activePage").remove();
      $(".prevPage")
        .removeClass("prevPage")
        .removeClass(function (index, className) {
          return (className.match(/(^|\s)transitionPage\S+/g) || []).join(' ');
        })
        .addClass("activePage")
        .css("transition", "0s")
        .css("transform", "translateX(0)");

      if ($(".activePage").css("z-index") == "-1") {
        $(".activePage").css("z-index", "0");
      }

    }, 500);
  } else {
    // Previous Page does not exists
    $(".loadingPage").remove();
    $(".loadingPageAtBack").remove();
    if (u_class.basePages.includes(gotoLocation)) {
      window.top.location.href = gotoLocation;
      return;
    }
    var html = "";
    html +=
      "<iframe src='" +
      gotoLocation +
      "' class='loadingPageAtBack' onload='transitionToBackPage()' />";
    $("body").append(html);
  }

};

closeCenterBodyContent = (id, backgroundScroll = $("body").css("overflow"), onClose) => {
  $("#" + id).fadeOut(400);
  setTimeout(() => {
    $("body").css("overflow", backgroundScroll);
    $("#" + id).remove();
    if (onClose) {
      onClose();
    }
  }, 450);
};

closeDrawer = (id, backgroundScroll) => {
  $("#" + id).fadeOut(400);
  $("#" + id + " .uDrawer_container")
    .removeClass("open_uDrawer_container")
    .css("transition", "0s")
    .css("transform", "translateY(-100vh)")
    .addClass("close_uDrawer_container");

  $("body").css("overflow", backgroundScroll);
  setTimeout(() => {
    $("#" + id).remove();
  }, 150)
};

closeCenterBodyContentOnBackgroundClick = (id, backgroundScroll, onClose) => {
  if ($(event.target).hasClass("uModal") || $(event.target).hasClass("closeNotice")) {
    closeCenterBodyContent(id, backgroundScroll, onClose);
  }
};

closeDrawerOnBackgroundClick = (id, backgroundScroll) => {
  if ($(event.target).hasClass("uDrawer")) {
    closeDrawer(id, backgroundScroll);
    $("body").css("overflow", backgroundScroll);
  }
}

closeNavDrawer = (navClass) => {
  if ($(event.target).attr("id") == 'uNavDrawer') {
    $("body").css("overflow", this.backgroundScroll);

    if (navClass == "uLeftDrawer") {
      fillUpMenu("menu", "left");
      $("." + navClass).addClass("closedLeftDrawer").removeClass("openLeftDrawer");
    }
    else {
      fillUpMenu("menu", "right");
      $("." + navClass).addClass("closedRightDrawer").removeClass("openRightDrawer");
    }
  }
}

closeMainModal = (id, backgroundScroll, onClose) => {
  if ($(event.target).hasClass("uMainModalContainer") || $(event.target).hasClass("uMainModal_closeButton")) {
    $("#" + id).addClass("uCloseMainModalContainer");
    $("body").css("overflow", backgroundScroll);
    setTimeout(() => {
      $($("#" + id)).parent().fadeOut();
    }, 200);
    setTimeout(() => {
      $($("#" + id)).parent().remove();
    }, 600)
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 500);
  }
}

closeMainModalOnBackgroundClick = (id, backgroundScroll, onClose) => {
  if ($(event.target).hasClass("uMainModalContainer")) {
    closeMainModal(id, backgroundScroll, onClose);
  }
}

closeToast = (id) => {
  $('#' + id).addClass("closeToast");
  setTimeout(() => {
    $('#' + id).remove();
  }, 600)

}

uConsole = ({ type = "", data, css }) => {
  if (type == "log" || type == "") {
    if (type == "log") {
      console.log(data);
    }
    else if (typeof data == "string") {
      console.log("%c " + data, css);
    }
    else if (typeof data == "object") {
      if (data.length < 50) {
        console.table(data);
      }
      else {
        console.log(data);
      }
    }
    else {
      console.log(typeof data);
      console.log(data);
    }
  }
  else {
    console[type](data);
  }
}

setNavMenuTitle = (direction) => {
  let menuTitle = "";


  let depth = $(".menuTitle").data("depth");
  let opacity = 1;
  if (depth.length == 1) {
    menuTitle += "<span>" + depth[0][1] + "</span>";
  }
  else if (depth.length > 1) {
    for (let i = 0; i < depth.length; i++) {
      if (i != depth.length - 1) {
        menuTitle += "<span style='opacity: " + opacity + "' onclick='fillUpMenu(\"" + depth[i][0] + "\", \"" + direction + "\",\"\", " + true + ")'>" + depth[i][1] + " ></span> ";
      }
      else {
        menuTitle += "<span style='opacity: " + opacity + "'>" + depth[i][1] + "</span>";
      }

      if (opacity > 0.4) {
        opacity -= 0.2;
      }
      else {
        opacity -= 0.05;
      }
    }
  }
  $(".menuTitle").html(menuTitle);
  var leftPos = $('.menuTitle').scrollLeft();
  $(".menuTitle").animate({ scrollLeft: leftPos + 200 }, 800);
}

fillUpMenu = (heading, direction, clicked = "menu", goingBack = false) => {

  if (goingBack) {
    let depth = $(".menuTitle").data("depth");
    while (depth[depth.length - 1][0] != heading) {
      depth.pop();
    }
    $(".menuTitle").data("depth", depth);
  }
  else {
    if (heading == "menu") {
      $(".menuTitle").data("depth", [["menu", "menu"]]);
    }
    else {
      let depth = $(".menuTitle").data("depth");
      depth.push([heading, clicked]);
      $(".menuTitle").data("depth", depth);
    }
  }

  $(".menuContents").fadeOut(100);

  let completeMenu = [];
  if (direction == "left") {
    completeMenu = $("body").data('completeLeftMenu');
  }
  else {
    completeMenu = $("body").data('completeRightMenu');
  }

  setTimeout(() => {
    var html = "";
    let menu = completeMenu[heading];
    for (let i = 0; i < menu.length; i++) {
      if (menu[i][2].length > 0) {
        if (direction == "left") {
          html += "<div id='menuItems' class='verticallyCenterAligned' onclick='fillUpMenu(\"" + menu[i][2] + "\", \"left\" ,\"" + menu[i][1] + "\")'>";
        }
        else {
          html += "<div id='menuItems' class='verticallyCenterAligned' onclick='fillUpMenu(\"" + menu[i][2] + "\", \"right\" ,\"" + menu[i][1] + "\")'>";
        }
      }
      else if (menu[i][3].length > 0) {
        html += "<div id='menuItems' class='verticallyCenterAligned' onclick='" + menu[i][3] + "(" + menu[i][4] + ")'>";
      }
      else {
        html += "<div id='menuItems' class='verticallyCenterAligned'>";
      }

      html += " <i class='" + menu[i][0] + "'></i>";
      html += menu[i][1];
      if (menu[i][2].length > 0) {
        html += "<i style='margin-right: 0;' class='fa fa-caret-right alignRightAbsolute'></i>";
      }
      html += "</div>";
    }

    setNavMenuTitle(direction);
    $(".menuContents").html(html).fadeIn(100);

  }, 125);
}

transitionPage = (direction) => {
  if (direction == "right") {
    $(".prevPage").remove();
    $(".loadingPage").addClass("transitionPageLeft");

    x = $("body").data("pageLoad");
    x.push("right");
    $('body').data("pageLoad", x);

    setTimeout(() => {
      $(".activePage").removeClass("activePage").addClass("prevPage");
      $(".loadingPage")
        .removeClass("loadingPage")
        .removeClass("transitionPageLeft")
        .addClass("activePage")
        .css("transition", "0s")
        .css("transform", "translateX(0)");
      callPageLoadedEvent();
    }, 500);
  }
  else if (direction == "up") {
    $(".prevPage").remove();
    $(".activePage");
    $(".loadingPageTop").addClass("transitionPageUp");

    x = $("body").data("pageLoad");
    x.push("up");
    $('body').data("pageLoad", x);

    setTimeout(() => {
      $(".activePage").removeClass("activePage").addClass("prevPage");
      $(".loadingPageTop")
        .removeClass("loadingPageTop")
        .removeClass("transitionPageUp")
        .addClass("activePage")
        .css("transition", "0s");
      callPageLoadedEvent();
    }, 500);
  }
};

callBackPageEvent = () => {
  setTimeout(() => {
    // Page load complete
    let customEvent = new CustomEvent(
      "backPageEvent",
      {
        detail: {
          result: false,
          type: "no match",
          transcript: "Could not recognize that",
        },
        bubbles: true,
        cancelable: true
      }
    );
    window.top.document.body.dispatchEvent(customEvent);

  }, 300);
}

callPageLoadedEvent = () => {
  setTimeout(() => {
    // Page load complete
    let customEvent = new CustomEvent(
      "pageLoadComplete",
      {
        detail: {
          result: false,
          type: "no match",
          transcript: "Could not recognize that",
        },
        bubbles: true,
        cancelable: true
      }
    );
    document.body.dispatchEvent(customEvent);

  }, 300);
}


transitionToBackPage = () => {

  directions = $("body").data("pageLoad");
  x = directions.pop();
  $("body").data("pageLoad", directions);
  if (x == "right") {
    $(".activePage").addClass("transitionPageRight");
  } else if (x == "up") {
    $(".activePage").addClass("transitionPageDown");
  }

  setTimeout(() => {
    $(".activePage").remove();
    $(".loadingPageAtBack")
      .removeClass("loadingPageAtBack")
      .removeClass(function (index, className) {
        return (className.match(/(^|\s)transitionPage\S+/g) || []).join(' ');
      })
      .addClass("activePage")
      .css("transition", "0s")
      .css("transform", "translateX(0)");
  }, 500);

};

openGroupedModal = (index) => {
  if ($(`.uMainModalContainer${index}`).hasClass("uMainModalContainer")) {
    return;
  }

  let currentPage = $(`.uMainModalBackground`).data("currentPage");
  if (index > currentPage) {
    $(`.uMainModalContainer`).addClass("uSlideMainModalLeft").removeClass("uBringMainModalFromLeft").removeClass("uBringMainModalFromRight");

    setTimeout(() => {
      $(`.uMainModalContainer`).removeClass(`uMainModalContainer`).removeClass(`uSlideMainModalLeft`).removeClass(`uBringMainModalFromLeft`);
      $(`.uMainModalContainer${index}`).addClass("uMainModalContainer").addClass("uBringMainModalFromLeft");

      $(`.groupMemberButton`).removeClass("uMainModalCurrentMemeber");
      $(`.groupMemberButton:nth-child(${index + 1})`).addClass("uMainModalCurrentMemeber");
    }, 100);
    $(`.uMainModalBackground`).data("currentPage", index);
  } else {
    $(`.uMainModalContainer`).addClass("uSlideMainModalRight").removeClass("uBringMainModalFromRight").removeClass("uBringMainModalFromLeft");

    setTimeout(() => {
      $(`.uMainModalContainer`).removeClass(`uMainModalContainer`).removeClass(`uSlideMainModalRight`).removeClass(`uBringMainModalFromRight`);
      $(`.uMainModalContainer${index}`).addClass("uMainModalContainer").addClass("uBringMainModalFromRight");

      $(`.groupMemberButton`).removeClass("uMainModalCurrentMemeber");
      $(`.groupMemberButton:nth-child(${index + 1})`).addClass("uMainModalCurrentMemeber");
    }, 100);
    $(`.uMainModalBackground`).data("currentPage", index);
  }
}

setDefaults = (title, msg, backgroundColor, titleColor, animationUrl) => {
  if (!title || !title.length) {
    title = "NOTICE";
  }
  if (!msg || !msg.length) {
    msg = "Notice Msg";
  }
  if (!backgroundColor || !backgroundColor.length) {
    backgroundColor = "#FFCA28";
  }
  if (!titleColor || !titleColor.length) {
    titleColor = "#FFF";
  }
  if (!animationUrl || !animationUrl.length) {
    animationUrl = "./lottie/hint.json";
  }

  return [title, msg, backgroundColor, titleColor, animationUrl];
}

changeNotice = (mem) => {
  currentMem = $(".uModal").data("currentMem");
  if (mem == currentMem) {
    return;
  }
  newContent = $(".uModal").data("content")[mem];
  curContent = $(".uModal").data("content")[currentMem];

  [title, msg, backgroundColor, titleColor, animationUrl] = setDefaults(newContent.title, newContent.msg, newContent.backgroundColor, newContent.titleColor, newContent.animationUrl);

  if (msg != curContent.msg) {
    $(".uNotice .uModal_Container__Msg").fadeTo("fast", "0", () => {
      $(".uNotice .uModal_Container__Msg").html(msg).fadeTo("fast", "1", () => { });
    });
  }

  let html = '        <lottie-player src="' + animationUrl + '" background="transparent" speed="1" autoplay style="height: 40px;max-width: 60px;padding: 0 !important;"></lottie-player>';
  if (title && title.length > 0) {
    html += '         <div class="uModal_Container__Text"  style="color:' + titleColor + ';  margin: 0; padding: 0; text-align: left;">' + title + "</div>";
  }
  $(".uNotice .decorator").html(html);

  $(".uNotice .decorator").css("backgroundColor", backgroundColor);
  $(".uNotice .uModal_Container").css("border-color", backgroundColor);

  $(".uModal").data("currentMem", mem);
  $(`.groupMemberButton`).removeClass(`uMainModalCurrentMemeber`);
  $(`.groupMemberButton:nth-child(${mem + 1})`).addClass(`uMainModalCurrentMemeber`);

  $(".prevNotice").css("border-color", backgroundColor).css("color", backgroundColor);
  $(".nextNotice").css("background-color", backgroundColor);
  $(".closeNotice").css("background-color", backgroundColor);;

  content = $(".uModal").data("content");
  setNoticeButtons(mem, content);
}

prevNotice = () => {
  currentMem = $(".uModal").data("currentMem");
  content = $(".uModal").data("content");

  changeNotice(currentMem - 1);
}

nextNotice = () => {
  currentMem = $(".uModal").data("currentMem");
  content = $(".uModal").data("content");

  changeNotice(currentMem + 1);
}

setNoticeButtons = (currentMem, content) => {
  if (currentMem == 0) {
    $(".prevNotice").css("display", "none");
  } else {
    $(".prevNotice").css("display", "flex");
  }

  if (currentMem == content.length - 1) {
    $(".nextNotice").css("display", "none");
  } else {
    $(".nextNotice").css("display", "flex");
  }

  if (currentMem == content.length - 1) {
    $(".closeNotice").css("display", "flex")
  } else {
    $(".closeNotice").css("display", "none")
  }

}