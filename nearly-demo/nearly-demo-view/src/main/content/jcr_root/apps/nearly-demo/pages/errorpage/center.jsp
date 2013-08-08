<%@ page import="java.util.ResourceBundle" %>
<%@ page import="javax.servlet.jsp.jstl.core.Config" %>
<%@ page import="javax.servlet.jsp.jstl.fmt.LocalizationContext" %>
<%@ page import="java.util.Locale" %>
<%@ page import="org.apache.sling.api.SlingHttpServletRequest" %>
<%@ page import="org.apache.sling.i18n.ResourceBundleProvider" %>
<%@page session="false" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@include file="/libs/foundation/global.jsp" %>
<div class="main main_error-page clearfix" role="main">
     <cq:include path="page404" resourceType="nearly-demo/components/m5-page-404"/>
</div>




