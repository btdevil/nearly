<!-- JSP for including custom clientlibs in child components -->
<%@page session="false" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/libs/foundation/global.jsp"%>
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<cq:includeClientLib js="apps.nearly-demo.components"/>
<cq:includeClientLib js="apps.nearly-demo.pages.base" />

