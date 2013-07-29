<%@ include file="/apps/nearly-demo/components/global.jspx" %>
<%@taglib prefix="ne" uri="http://demo.nearly.com/taglibs/nearly-demo-taglib" %>
<%@page import="com.day.cq.wcm.api.WCMMode"%>
<cq:setContentBundle />

<div id="loaderMessages" class="clear <%if (WCMMode.fromRequest(request) != WCMMode.DISABLED) {%>show<%}%>">
	<%
        //include custom widgets for authoring dialogs only in non-publish mode
        if (WCMMode.fromRequest(request) != WCMMode.DISABLED) {
    %>
        Loader Messages
    <%
        }
    %>
</div>