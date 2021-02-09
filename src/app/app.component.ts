import { Component, } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

  firstId = 1000;
  secondId = 2000;
  allHtmlItemContents = "";
  allHtmlItemContentsBackup = "";
  htmlResult = "";

  add() {
    this.allHtmlItemContentsBackup = this.allHtmlItemContents;

    this.firstId = this.firstId+1;
    this.secondId = this.secondId+1;

    var header = (<HTMLInputElement>document.getElementById("inputHeader"))?.value;
    var headerDetail = (<HTMLInputElement>document.getElementById("inputHeaderDetail"))?.value;
    var detail = (<HTMLInputElement>document.getElementById("inputDetail"))?.value;
    var buttonText = (<HTMLInputElement>document.getElementById("inputButtonText"))?.value;
    var buttonLink = (<HTMLInputElement>document.getElementById("inputLink"))?.value;

    var hmtlItemTemplate = "<div class=\"card-header collapsed\" id=\"heading-{{second_id}}\" data-toggle=\"collapse\" data-target=\"#collapse-{{first_id}}\" aria-expanded=\"false\"> <button class=\"btn btn-link collapsed\" data-toggle=\"collapse\" data-target=\"#collapse-{{first_id}}\" aria-expanded=\"false\" aria-controls=\"collapse-{{first_id}}\" itemprop=\"name\"><span><b style=\"color: #39CBA1\">{{ueberschrift}} </b>{{ueberschrift_detail}}</span></button> <span class=\"icon float-right\"></span> </div> <div id=\"collapse-{{first_id}}\" class=\"collapse\" aria-labelledby=\"heading-{{second_id}}\" data-parent=\"#accordion\" style=\"\"> <div class=\"card-body p-3 p-md-4\" itemprop=\"acceptedAnswer\" itemscope=\"\" itemtype=\"http://schema.org/Answer\"> <div itemprop=\"text\">{{detail}}</div> <a class=\"btn btn-block btn-buy\" title=\"Zum Artikel\" href=\"{{button_link}}\">{{button_text}}</a> </div> </div>";

    var htmlItemContent = hmtlItemTemplate 
      .replace("{{second_id}}", this.secondId.toString())
      .replace("{{second_id}}", this.secondId.toString())
      .replace("{{first_id}}", this.firstId.toString())
      .replace("{{first_id}}", this.firstId.toString())
      .replace("{{first_id}}", this.firstId.toString())
      .replace("{{first_id}}", this.firstId.toString())
      .replace("{{ueberschrift}}", header)
      .replace("{{ueberschrift_detail}}", headerDetail)
      .replace("{{detail}}", detail)
      .replace("{{button_text}}", buttonText)
      .replace("{{button_link}}", buttonLink);

    this.allHtmlItemContents += htmlItemContent;

    this.renderHtml()

    this.copyMessage(this.htmlResult);
  }

  deleteLast(){
    this.allHtmlItemContents = this.allHtmlItemContentsBackup;

    this.renderHtml()

    this.copyMessage(this.htmlResult);
  }

  renderHtml(){
    var htmlBeginning = "<div style=\"text-align:center\"> <img src=\"https://www.arctic.de/media/78/e0/e3/1580897843/ARCTIC_Community_grey.svg\" width=\"100px\"> </img> <h3 style=\"font-size:1.3rem; margin-top:12px; margin-bottom:30px\">Stellenangebote</h3> </div> <div itemscope=\"\" itemtype=\"http://schema.org/FAQPage\"> <div id=\"accordion\" class=\"faq\"> <div class=\"mb-5\"> <div class=\"row\"> <div class=\"col-12 col-lg-12\"> <div class=\"card mb-2\" itemprop=\"mainEntity\" itemscope=\"\" itemtype=\"http://schema.org/Question\">";
    var htmlEnd = "</div> </div> </div> </div> </div>";
    this.htmlResult = htmlBeginning + this.allHtmlItemContents + htmlEnd;

    var htmlResultExpanded = this.htmlResult;
    while(htmlResultExpanded.includes("card-header collapsed")
      || htmlResultExpanded.includes("aria-expanded=\"false\"")
      || htmlResultExpanded.includes("btn btn-link collapsed")
      || htmlResultExpanded.includes("class=\"collapse\"")){
      htmlResultExpanded = htmlResultExpanded
        .replace("card-header collapsed", "card-header")
        .replace("aria-expanded=\"false\"", "aria-expanded=\"true\"")
        .replace("btn btn-link collapsed", "btn btn-link")
        .replace("class=\"collapse\"", "class=\"collapse show\"");
    }

    (<HTMLInputElement>document.getElementById("result")).innerHTML = htmlResultExpanded;
  }

  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
