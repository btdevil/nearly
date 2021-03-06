<%@page session="false" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@include file="/libs/foundation/global.jsp" %>
<%@page import="com.day.cq.wcm.api.WCMMode" %>


<cq:setContentBundle />
<c:set var="defaultTitle">
    <fmt:message key="M0042"/>
</c:set>
<head>
<title>${empty currentPage.title ? defaultTitle : currentPage.title}</title>
<cq:include script="/libs/wcm/core/components/init/init.jsp"/>
<link href='http://fonts.googleapis.com/css?family=Oleo+Script|Yesteryear|Gochi+Hand|Open+Sans:400,600' rel='stylesheet' type='text/css'>
<cq:include script="scripts_head.jsp"/>
</head>