## Types

https://json-schema.org/understanding-json-schema/reference/type.html


* string
* Numeric types
* object
* array
* boolean
* null

## String formats:

https://json-schema.org/understanding-json-schema/reference/string.html

Dates and times
Dates and times are represented in RFC 3339, section 5.6. This is a subset of the date format also commonly known as ISO8601 format.

"date-time": Date and time together, for example, 2018-11-13T20:20:39+00:00.

"time": New in draft 7 Time, for example, 20:20:39+00:00

"date": New in draft 7 Date, for example, 2018-11-13.

Email addresses
"email": Internet email address, see RFC 5322, section 3.4.1.

"idn-email": New in draft 7 The internationalized form of an Internet email address, see RFC 6531.

Hostnames
"hostname": Internet host name, see RFC 1034, section 3.1.

"idn-hostname": New in draft 7 An internationalized Internet host name, see RFC5890, section 2.3.2.3.

IP Addresses
"ipv4": IPv4 address, according to dotted-quad ABNF syntax as defined in RFC 2673, section 3.2.

"ipv6": IPv6 address, as defined in RFC 2373, section 2.2.

Resource identifiers
"uri": A universal resource identifier (URI), according to RFC3986.

"uri-reference": New in draft 6 A URI Reference (either a URI or a relative-reference), according to RFC3986, section 4.1.

"iri": New in draft 7 The internationalized equivalent of a “uri”, according to RFC3987.

"iri-reference": New in draft 7 The internationalized equivalent of a “uri-reference”, according to RFC3987

If the values in the schema the ability to be relative to a particular source path (such as a link from a webpage), it is generally better practice to use "uri-reference" (or "iri-reference") rather than "uri" (or "iri"). "uri" should only be used when the path must be absolute.

Draft-specific info:

Draft 4

Draft 4 only includes "uri", not "uri-reference". Therefore, there is some ambiguity around whether "uri" should accept relative paths.

URI template
"uri-template": New in draft 6 A URI Template (of any level) according to RFC6570. If you don’t already know what a URI Template is, you probably don’t need this value.

JSON Pointer
"json-pointer": New in draft 6 A JSON Pointer, according to RFC6901. There is more discussion on the use of JSON Pointer within JSON Schema in Structuring a complex schema. Note that this should be used only when the entire string contains only JSON Pointer content, e.g. /foo/bar. JSON Pointer URI fragments, e.g. #/foo/bar/ should use "uri-reference".

"relative-json-pointer": New in draft 7 A relative JSON pointer.

Regular Expressions
"regex": New in draft 7 A regular expression, which should be valid according to the ECMA 262 dialect.