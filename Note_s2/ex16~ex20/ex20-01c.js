 
      const obj = {};
      /* 동적으로 객체 속성 추가 */
      obj.a = 1;
      obj.b = 2;
      obj.e = "실수";
      obj["c"] = function () {
        return this.b;
      };
      obj.d = function () {
        console.log(this.a);
      };

      /* 객체의 속성과 메소드 호출 */
      console.log(obj);
      console.log(obj.c());
      obj.d();

      /* 삭제 */
      delete obj.e;
      console.log(obj);

      /* this 확인 */
      function test1() {
        console.log(this.document);
      }
      
      function test2() {
          return this;
        }
        
        console.log(test2());
        test1();
    