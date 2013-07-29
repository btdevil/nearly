<%--
  Copyright 1997-2009 Day Management AG
  Barfuesserplatz 6, 4001 Basel, Switzerland
  All Rights Reserved.

  This software is the confidential and proprietary information of
  Day Management AG, ("Confidential Information"). You shall not
  disclose such Confidential Information and shall use it only in
  accordance with the terms of the license agreement you entered into
  with Day.

  ==============================================================================

  Default error handler

--%><%@page session="false" pageEncoding="utf-8"
         import="com.day.cq.wcm.api.WCMMode,
                    java.io.PrintWriter,
                    org.apache.sling.api.SlingConstants,
                    org.apache.sling.api.request.RequestProgressTracker,
                    org.apache.sling.api.request.ResponseUtil,
                    org.apache.commons.lang3.StringEscapeUtils" %><%
%><%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0" %><%
%><sling:defineObjects /><%
%><%

    String message = (String) request.getAttribute("javax.servlet.error.message");
    Integer scObject = (Integer) request.getAttribute("javax.servlet.error.status_code");
    boolean isAuthorMode = WCMMode.fromRequest(request) != WCMMode.DISABLED;

    int statusCode = (scObject != null)
            ? scObject.intValue()
            : HttpServletResponse.SC_INTERNAL_SERVER_ERROR;
    if (message == null) {
        message = statusToString(statusCode);
    }

    response.setStatus(statusCode);
    response.setContentType("text/html");
    response.setCharacterEncoding("utf-8");

%><!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html>
    <head><title><%= statusCode %> <%= StringEscapeUtils.escapeHtml4(message) %></title>
    <link href='http://fonts.googleapis.com/css?family=Oleo+Script|Yesteryear|Gochi+Hand|Open+Sans:400,600' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="/etc/designs/nearly-demo/clientlibs/pages/base.css" type="text/css">
    </head>
    <body>
        <div class="header-cont clear">
            <ul><li class="acc">Menu</li></ul>
            <a class="logo" href="/content/nearly-demo/en/homepage.html">
            Near<span class="italSc">.ly</span>
            </a>
        </div>
        <div class="errorPage">
        <h1>Oops, we've lost you</h1>
        <p>Please return to your homepage and try again<br />
        <a href="/content/nearly-demo/en/homepage.html">Back to homepage</a>
        </p>
        <h2>โอ๊ะโอเราได้สูญเสียคุณ</h2>
         <p>กรุณากลับไปที่หน้าแรกของคุณและลองอีกครั้ง<br />
                 <a href="/content/nearly-demo/th_th/homepage.html">กลับไปที่หน้าแรกของ</a>
                 </p>
        <p><%= StringEscapeUtils.escapeHtml4(message) %></p>
</div>


        <hr>
        <address><%= StringEscapeUtils.escapeHtml4(this.getServletConfig().getServletContext().getServerInfo()) %></address>
    </body>
</html><%!

    /**
     * Print the stack trace for the root exception if the throwable is a
     * {@link ServletException}. If this does not contain an exception,
     * the throwable itself is printed.
     */
    private void printStackTrace(PrintWriter pw, Throwable t) {
        // nothing to do, if there is no exception
        if (t == null) {
            return;
        }

        // unpack a servlet exception
        if (t instanceof ServletException) {
            ServletException se = (ServletException) t;
            while (se.getRootCause() != null) {
                t = se.getRootCause();
                if (t instanceof ServletException) {
                    se = (ServletException) t;
                } else {
                    break;
                }
            }
        }

        // dump stack, including causes
        t.printStackTrace(pw);
    }

    public static String statusToString(int statusCode) {
        switch (statusCode) {
            case 100:
                return "Continue";
            case 101:
                return "Switching Protocols";
            case 102:
                return "Processing (WebDAV)";
            case 200:
                return "OK";
            case 201:
                return "Created";
            case 202:
                return "Accepted";
            case 203:
                return "Non-Authoritative Information";
            case 204:
                return "No Content";
            case 205:
                return "Reset Content";
            case 206:
                return "Partial Content";
            case 207:
                return "Multi-Status (WebDAV)";
            case 300:
                return "Multiple Choices";
            case 301:
                return "Moved Permanently";
            case 302:
                return "Found";
            case 303:
                return "See Other";
            case 304:
                return "Not Modified";
            case 305:
                return "Use Proxy";
            case 307:
                return "Temporary Redirect";
            case 400:
                return "Bad Request";
            case 401:
                return "Unauthorized";
            case 402:
                return "Payment Required";
            case 403:
                return "Forbidden";
            case 404:
                return "Not Found";
            case 405:
                return "Method Not Allowed";
            case 406:
                return "Not Acceptable";
            case 407:
                return "Proxy Authentication Required";
            case 408:
                return "Request Time-out";
            case 409:
                return "Conflict";
            case 410:
                return "Gone";
            case 411:
                return "Length Required";
            case 412:
                return "Precondition Failed";
            case 413:
                return "Request Entity Too Large";
            case 414:
                return "Request-URI Too Large";
            case 415:
                return "Unsupported Media Type";
            case 416:
                return "Requested range not satisfiable";
            case 417:
                return "Expectation Failed";
            case 422:
                return "Unprocessable Entity (WebDAV)";
            case 423:
                return "Locked (WebDAV)";
            case 424:
                return "Failed Dependency (WebDAV)";
            case 500:
                return "Internal Server Error";
            case 501:
                return "Not Implemented";
            case 502:
                return "Bad Gateway";
            case 503:
                return "Service Unavailable";
            case 504:
                return "Gateway Time-out";
            case 505:
                return "HTTP Version not supported";
            case 507:
                return "Insufficient Storage (WebDAV)";
            case 510:
                return "Not Extended";
            default:
                return String.valueOf(statusCode);
        }
    }

%>
