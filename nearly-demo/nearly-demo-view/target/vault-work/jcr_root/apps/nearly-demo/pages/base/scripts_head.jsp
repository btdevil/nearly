<%@page session="false" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/libs/foundation/global.jsp"%>

<cq:includeClientLib css="apps.nearly-demo.pages.base" />
<%
%><cq:includeClientLib categories="cq.foundation-main"/>
<cq:includeClientLib css="apps.nearly-demo.components"/>
<%
    currentDesign.writeCssIncludes(pageContext); %>