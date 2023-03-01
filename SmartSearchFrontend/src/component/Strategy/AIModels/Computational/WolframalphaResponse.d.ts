
export abstract class WolframalphaResponse {

  success: boolean;
  error: boolean;
  numpods: number;
  datatypes: string;
  timedout: string;
  timedoutpods: string;
  timing: number;
  parsetiming: number;
  parsetimedout: boolean;
  recalculate: boolean;
  id: string;
  host: string;
  server: string;
  related: string;
  version: string;
  inputstring: string;
  pods:[
      {
        title: string,
        scanner: string,
        id: string,
        position: number,
        error: boolean,
        numsubpods: number,
        markup:{
          data: string
        },
        subpods:[
          {
            title:string,
            img:{
              src: string,
              alt: string,
              title: string,
              width:number,
              height: number,
              type: string,
              themes: string,
              colorinvertable: boolean,
              contenttype: string
            },
            plaintext: string
          }
        ],
        expressiontypes:{
          name: string
        }
      },
      {
        title: string,
        scanner: string,
        id: string,
        position: number,
        error: boolean,
        numsubpods: number,
        markup:{
          data: string
        },
        subpods:[
          {
            title: string,
            microsources:{
              microsource: string
            },
            img:{
              src: string,
              alt: string,
              title:string,
              width: number,
              height: number,
              type: string,
              themes: string,
              colorinvertable: boolean,
              contenttype: string
            },
            plaintext: string
          }
        ],
        expressiontypes:{
          name: string
        }
      },
      {
        title: string,
        scanner: string,
        id: string,
        position:number,
        error:boolean,
        numsubpods:number,
        markup:{
          data: string
        },
        subpods:[
          {
            title: string,
            microsources:{
              microsource: string
            },
            img:{
              src: string,
              alt: string,
              title: string,
              width:number,
              height:number,
              type: string,
              themes: string,
              colorinvertable:true,
              contenttype: string
            },
            plaintext: string
          }
        ],
        expressiontypes:{
          name: string
        }
      },
      {
        title: string,
        scanner: string,
        id: string,
        position:number,
        error:boolean,
        numsubpods: number,
        markup:{
          data: string
        },
        subpods:[
          {
            title: string,
            microsources:{
              microsource: string
            },
            img:{
              src: string,
              alt: string,
              title: string,
              width: number,
              height: number,
              type: string,
              themes: string,
              colorinvertable:boolean,
              contenttype: string
            },
            plaintext: string
          }
        ],
        expressiontypes:{
          name: string
        }
      },
      {
        title: string,
        scanner: string,
        id: string,
        position: number,
        error:boolean,
        numsubpods: number,
        markup:{
          data: string
        },
        subpods:[
          {
            title: string,
            microsources:{
              microsource: string
            },
            img:{
              src: string,
              alt: string,
              title: string,
              width: number,
              height: number,
              type: string,
              themes: string,
              colorinvertable:boolean,
              contenttype: string
            },
            plaintext: string
          }
        ],
        expressiontypes:{
          name: string
        },
        states:[
          {
            name: string,
            input: string
          }
        ]
      },
      {
        title: string,
        scanner: string,
        id: string,
        position: number,
        error:boolean,
        numsubpods: number,
        markup:{
          data: string
        },
        subpods:[
          {
            title: string,
            microsources:{
              microsource: string
            },
            img:{
              src: string,
              alt: string,
              title: string,
              width: number,
              height: number,
              type: string,
              themes: string,
              colorinvertable:boolean,
              contenttype: string
            },
            plaintext: string
          }
        ],
        expressiontypes:{
          name: string
        }
      },
      {
        title: string,
        scanner: string,
        id: string,
        position: number,
        error:boolean,
        numsubpods: number,
        markup:{
          data: string
        },
        subpods:[
          {
            title: string,
            microsources:{
              microsource: string
            },
            img:{
              src: string,
              alt: string,
              title: string,
              width: number,
              height: number,
              type: string,
              themes: string,
              colorinvertable:boolean,
              contenttype: string
            },
            plaintext: string
          }
        ],
        expressiontypes:{
          name: string
        }
      }
    ];
  assumptions:{
      type: string,
      word: string,
      template: string,
      count: number,
      values:[
        {
          name: string,
          desc: string,
          input: string
        },
        {
          name: string,
          desc: string,
          input: string
        }
      ]
    };
  sources:{
      url: string,
      text: string
    };
  scripts:{
      data: string
    };
  css:{
      data: string
    };
}
