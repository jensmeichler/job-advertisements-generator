import { Component, OnInit, } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  allHtmlItemContents = "";
  allHtmlItemContentsBackup = "";
  htmlResult = "";

  ngOnInit() {
    this.allHtmlItemContents = this.getHtmlItemContent(true);
    this.renderHtml();
    this.allHtmlItemContents = "";
  }

  add() {
    this.allHtmlItemContentsBackup = this.allHtmlItemContents;

    this.allHtmlItemContents += this.getHtmlItemContent(false);

    this.renderHtml()

    this.copyMessage(this.htmlResult);
  }

  getHtmlItemContent(isTemplate: Boolean){
    var currentDate = Date.now();
    var firstId = currentDate;
    var secondId = currentDate+1;

    var header = (<HTMLInputElement>document.getElementById("inputHeader"))?.value;
    var headerDetail = (<HTMLInputElement>document.getElementById("inputHeaderDetail"))?.value;
    var detail = (<HTMLInputElement>document.getElementById("inputDetail"))?.value;
    var buttonText = (<HTMLInputElement>document.getElementById("inputButtonText"))?.value;
    var buttonLink = (<HTMLInputElement>document.getElementById("inputLink"))?.value;

    if (isTemplate){
      var header = (<HTMLInputElement>document.getElementById("inputHeader"))?.placeholder;
      var headerDetail = (<HTMLInputElement>document.getElementById("inputHeaderDetail"))?.placeholder;
      var detail = (<HTMLInputElement>document.getElementById("inputDetail"))?.placeholder;
      var buttonText = (<HTMLInputElement>document.getElementById("inputButtonText"))?.placeholder;
      var buttonLink = (<HTMLInputElement>document.getElementById("inputLink"))?.placeholder;
    }

    var hmtlItemTemplate = "<!--TEMPLATE-{{first_id}}-START--><div class=\"card-header collapsed\" id=\"heading-{{second_id}}\" data-toggle=\"collapse\" data-target=\"#collapse-{{first_id}}\" aria-expanded=\"false\"> <button class=\"btn btn-link collapsed\" data-toggle=\"collapse\" data-target=\"#collapse-{{first_id}}\" aria-expanded=\"false\" aria-controls=\"collapse-{{first_id}}\" itemprop=\"name\"><span><b style=\"color: #39CBA1\">{{ueberschrift}} </b>{{ueberschrift_detail}}</span></button> <span class=\"icon float-right\"></span> </div> <div id=\"collapse-{{first_id}}\" class=\"collapse\" aria-labelledby=\"heading-{{second_id}}\" data-parent=\"#accordion\" style=\"\"> <div class=\"card-body p-3 p-md-4\" itemprop=\"acceptedAnswer\" itemscope=\"\" itemtype=\"http://schema.org/Answer\"> <div itemprop=\"text\">{{detail}}</div> <a class=\"btn btn-block btn-buy\" title=\"Zum Artikel\" href=\"{{button_link}}\">{{button_text}}</a> </div> </div><!--TEMPLATE-{{first_id}}-END-->";

    var formattedDetail = detail;

    // Bullet point
    while (formattedDetail.includes("##")){
      formattedDetail = formattedDetail
        .replace("##", "•");
    }

    // Bolt font
    if (formattedDetail.startsWith("*")){
      formattedDetail = formattedDetail
        .replace("*", "<b style=\"color: #39CBA1\">");
    }
    while (formattedDetail.includes(" *")){
      formattedDetail = formattedDetail
        .replace(" *", " <b style=\"color: #39CBA1\">");
    }
    while (formattedDetail.includes("\n*")){
      formattedDetail = formattedDetail
        .replace("\n*", "\n<b style=\"color: #39CBA1\">");
    }
    while (formattedDetail.includes("* ")){
      formattedDetail = formattedDetail
        .replace("* ", "</b> ");
    }
    while (formattedDetail.includes("*\n")){
      formattedDetail = formattedDetail
        .replace("*\n", "</b>\n");
    }
    if (formattedDetail.endsWith("*")){
      formattedDetail = formattedDetail
        .replace("*", "</b>");
    }

    // Italic font
    if (formattedDetail.startsWith("_")){
      formattedDetail = formattedDetail
        .replace("_", "<em>");
    }
    while (formattedDetail.includes(" _")){
      formattedDetail = formattedDetail
        .replace(" _", " <em>");
    }
    while (formattedDetail.includes("\n_")){
      formattedDetail = formattedDetail
        .replace("\n_", "\n<em>");
    }
    while (formattedDetail.includes("_ ")){
      formattedDetail = formattedDetail
        .replace("_ ", "</em> ");
    }
    while (formattedDetail.includes("_\n")){
      formattedDetail = formattedDetail
        .replace("_\n", "</em>\n");
    }
    if (formattedDetail.endsWith("_")){
      formattedDetail = formattedDetail
        .replace("_", "</em>");
    }

    while (formattedDetail.includes("\n")){
      formattedDetail = formattedDetail
        .replace("\n", "<br>");
    }

    var htmlItemContent = hmtlItemTemplate 
      .replace("{{second_id}}", secondId.toString())
      .replace("{{second_id}}", secondId.toString())
      .replace("{{first_id}}", firstId.toString())
      .replace("{{first_id}}", firstId.toString())
      .replace("{{first_id}}", firstId.toString())
      .replace("{{first_id}}", firstId.toString())
      .replace("{{ueberschrift}}", header)
      .replace("{{ueberschrift_detail}}", headerDetail)
      .replace("{{detail}}", formattedDetail)
      .replace("{{button_text}}", buttonText)
      .replace("{{button_link}}", buttonLink);

    return htmlItemContent;
  }

  deleteLast(){
    this.allHtmlItemContents = this.allHtmlItemContentsBackup;

    this.renderHtml()

    this.copyMessage(this.htmlResult);
  }

  importHtml(){
    navigator.clipboard.readText()
  .then(text => {

    var htmlItemsFromPastetText = text
    .replace(/^.*?<!--PLACEHOLDER-START-DO-NOT-REMOVE-->/, "")
    .replace(/<!--PLACEHOLDER-END-DO-NOT-REMOVE-->.*?$/, "");

    this.allHtmlItemContents = htmlItemsFromPastetText;

    this.renderHtml();
  })
  .catch(err => {
    // maybe user didn't grant access to read from clipboard
    alert('Um den Text aus der Zwischenablage eingfügen zu könnne muss der Browser das Recht dazu haben :(');
  });
  }

  renderHtml(){
    var htmlPlaceholderStart = "<!--PLACEHOLDER-START-DO-NOT-REMOVE-->";
    var htmlPlaceholderEnd = "<!--PLACEHOLDER-END-DO-NOT-REMOVE-->";

    var htmlBeginning = "<div style=\"text-align:center\"> <img src=\"https://www.arctic.de/media/78/e0/e3/1580897843/ARCTIC_Community_grey.svg\" width=\"100px\"> </img> <h3 style=\"font-size:1.3rem; margin-top:12px; margin-bottom:30px\">Stellenangebote</h3> </div> <div itemscope=\"\" itemtype=\"http://schema.org/FAQPage\"> <div id=\"accordion\" class=\"faq\"> <div class=\"mb-5\"> <div class=\"row\"> <div class=\"col-12 col-lg-12\"> <div class=\"card mb-2\" itemprop=\"mainEntity\" itemscope=\"\" itemtype=\"http://schema.org/Question\">" + htmlPlaceholderStart;

    var htmlEnd = htmlPlaceholderEnd + " </div> </div> </div> </div> </div>";

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

  connectApi(){
    let test = "Button hat leider noch keine Funktion...";

    // let headers = new HttpHeaders();
    // headers  = headers.append('sw-access-key', 'SWSCRXB4YVK3SGDBA21RM0RSAQ');

    // let params = new HttpParams();
    // params = params.append('param-1', 'value-1');
    // params = params.append('param-2', 'value-2');
   
    // this.httpClient.get("https://arctic.sw6aufbau.de/store-api/v1/cms/4d7b93ea9a07448190d2fdbc9ee4aee0", { headers , params })
    
    alert(test);
  }
}
