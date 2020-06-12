
var javaArray = Java.to([3, 5, 7, 11], "int[]");

var list = new java.util.ArrayList();
list.add("s1");
list.add("s2");
list.add("s3");

var jsArray = Java.from(list);
print(jsArray);                                  // s1,s2,s3
print(Object.prototype.toString.call(jsArray));  // [object Array]
