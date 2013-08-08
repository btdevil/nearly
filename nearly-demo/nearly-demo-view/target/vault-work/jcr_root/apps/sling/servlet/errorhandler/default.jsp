<%@page session="false" pageEncoding="utf-8"
         import="com.day.cq.wcm.api.WCMMode,
                    java.io.PrintWriter,
                    javax.servlet.RequestDispatcher,
                    org.apache.sling.api.SlingConstants,
                    org.apache.sling.api.request.RequestProgressTracker,
                    org.apache.sling.api.request.ResponseUtil,
                    org.apache.commons.lang.StringEscapeUtils,
                    com.nearly.demo.services.errorhandler.ErrorHandlerServlet" %>
<%@taglib prefix="cq" uri="http://www.day.com/taglibs/cq/1.0" %>
<%@ taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0" %>
<sling:defineObjects/>
<cq:setContentBundle />
<%
    RequestDispatcher rd = request.getRequestDispatcher(ErrorHandlerServlet.PATH);
    rd.forward(request, response);
%>